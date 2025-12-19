/**
 * Base64 转换工具函数
 * 提供 Base64 编码和解码功能
 */

/**
 * 将字符串转换为 Base64 编码
 * @param str 要编码的字符串
 * @returns Base64 编码后的字符串
 */
export function encodeToBase64(str: string): string {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (error) {
    console.error('Base64 编码失败:', error);
    throw new Error('Base64 编码失败，请检查输入字符串');
  }
}

/**
 * 将 Base64 编码转换为字符串
 * @param base64Str Base64 编码的字符串
 * @returns 解码后的字符串
 */
export function decodeFromBase64(base64Str: string): string {
  try {
    return decodeURIComponent(escape(atob(base64Str)));
  } catch (error) {
    console.error('Base64 解码失败:', error);
    throw new Error('Base64 解码失败，请检查输入格式是否正确');
  }
}

/**
 * 检查字符串是否为有效的 Base64 格式
 * @param str 要检查的字符串
 * @returns 是否为有效的 Base64 格式
 */
export function isValidBase64(str: string): boolean {
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
  if (!base64Regex.test(str)) {
    return false;
  }
  
  try {
    decodeFromBase64(str);
    return true;
  } catch {
    return false;
  }
}