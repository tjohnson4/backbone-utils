/*!  v0.0.1 | build date : 2015-03-20 */
(function(window) {
    function TemplateUtil() {}
    TemplateUtil.PATH = "/templates";
    TemplateUtil.BASE_URI = undefined;
    TemplateUtil.render = function(templateName, templateData) {
        if (!$.cache) {
            $.cache = {};
        }
        if (!$.cache[templateName]) {
            var url = TemplateUtil.PATH + "/" + templateName + ".html";
            $.ajax({
                url: url,
                method: "GET",
                async: false,
                success: function(data) {
                    $.cache[templateName] = _.template(data);
                }
            });
        }
        return $.cache[templateName](templateData);
    };
    window.TemplateUtil = TemplateUtil;
})(window);