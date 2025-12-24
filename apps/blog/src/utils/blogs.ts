import MarkdownIt from 'markdown-it'

// 先声明md变量类型，避免循环引用问题
let md: MarkdownIt

// 初始化MarkdownIt实例
md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  // 确保代码块不会被执行
  highlight: function (str: string, lang: string): string {
    return `<pre class="language-${lang || ''}"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
})

// 添加自定义图片渲染规则，处理相对路径
const defaultImageRender = md.renderer.rules.image || function (tokens, idx, options, _env, self) {
  return self.renderToken(tokens, idx, options);
};

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const srcIndex = token.attrIndex('src');

  if (srcIndex >= 0) {
    let src = token.attrs![srcIndex][1];

    // 处理相对路径图片
    if (src.startsWith('../images/')) {
      // 提取图片文件名
      const imgName = src.split('../images/')[1];
      // 构建后，public/images/ 会被复制到根目录，所以使用 /images/ 路径
      const imgPrefix = import.meta.env.DEV ? '' : '/blog'
      token.attrs![srcIndex][1] = `${imgPrefix}/images/${imgName}`;
    }
  }

  return defaultImageRender(tokens, idx, options, env, self);
};

export interface BlogMeta {
  title: string
  date: string
  tags?: string[]
}

export interface Blog {
  id: string
  meta: BlogMeta
  content: string
  excerpt: string
}

// 手动实现 YAML front matter 解析函数
function parseFrontMatter(content: string): { meta: BlogMeta; content: string } {
  // 匹配 YAML front matter
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontMatterRegex);

  let meta: Partial<BlogMeta> = {};
  let mdContent = content;

  if (match) {
    const frontMatter = match[1];
    mdContent = content.slice(match[0].length);

    // 解析 YAML 格式的元数据
    const lines = frontMatter.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        continue;
      }

      // 处理 key: value 格式
      const [key, ...valueParts] = trimmedLine.split(':');
      if (key && valueParts.length > 0) {
        const trimmedKey = key.trim();
        const value = valueParts.join(':').trim();

        if (trimmedKey === 'tags') {
          // 处理 tags: [Vue, 性能] 格式
          const tagsMatch = value.match(/\[(.*?)\]/);
          if (tagsMatch) {
            meta.tags = tagsMatch[1].split(',').map(tag => tag.trim());
          }
        } else if (trimmedKey === 'title' || trimmedKey === 'date') {
          // 处理普通字符串值，移除可能的引号
          meta[trimmedKey as 'title' | 'date'] = value.replace(/^['"](.*)['"]$/, '$1');
        }
      }
    }
  }

  // 确保必要的字段存在
  if (!meta.title) {
    meta.title = '未命名博客';
  }

  if (!meta.date) {
    meta.date = new Date().toISOString();
  }

  return {
    meta: meta as BlogMeta,
    content: mdContent
  };
}

// 使用 Vite 的 import.meta.glob 动态导入所有 Markdown 文件
const blogFiles = import.meta.glob('../blogs/*.md', { as: 'raw', eager: true })

// 预处理所有博客数据
const allBlogs: Blog[] = Object.entries(blogFiles).map(([filePath, content]) => {
  // 从文件路径中提取博客 ID（只取文件名不带后缀，移除路径前缀）
  const idMatch = filePath.match(/([^/]+)\.md$/)?.[1]
  const id = idMatch || ''
  if (!id) return null

  const { meta, content: mdContent } = parseFrontMatter(content as string)

  // 提取摘要，取<!-- more -->之前的内容或者前150个字符
  const excerptMatch = mdContent.match(/^(.*?)<!-- more -->/s)
  let excerpt = excerptMatch ? excerptMatch[1] : mdContent.slice(0, 150)
  excerpt = excerpt.replace(/\n/g, ' ').trim()

  return {
    id,
    meta,
    content: mdContent,
    excerpt
  }
}).filter((blog): blog is Blog => blog !== null)

// 按日期排序，最新的在前
export function getBlogs(): Blog[] {
  return [...allBlogs].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime())
}

export function getBlogById(id: string): Blog | null {
  return allBlogs.find(blog => blog.id === id) || null
}

export function renderMarkdown(content: string): string {
  return md.render(content)
}
