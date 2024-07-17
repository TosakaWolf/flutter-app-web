(function() {
  // 系统级别后退
  (window as any).sysBack = function() {
    (window as any).globalRouter.go(-1)
  }
})()
