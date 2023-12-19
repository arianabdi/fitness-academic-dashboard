export async function ConvertFilterObjectToUrlParam(obj){
  console.log('ConvertFilterObjectToUrlParam', obj)
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}