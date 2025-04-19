window.onerror = function(message, source, lineno, colno, error) {
    console.error("捕获到全局错误：", message, "在", source, "的第", lineno, "行");
    return true;
};
