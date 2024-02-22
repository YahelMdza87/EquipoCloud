function truncate(
    str,
    count,
    withEllipsis = true
  ) {
    if (str.length <= count)
      return str
  
    const substring = str.substr(0, count)
  
    if (!withEllipsis)
        return substring
  
    return substring + '...'
  }
  
  module.exports = { truncate }