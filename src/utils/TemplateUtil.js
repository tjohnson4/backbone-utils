(function(window) {

    /**
     * Utility class for loading and caching template files
     *
     * @class TemplateUtil
     * @requires underscore
     * @requires jquery
     * @constructor
     */
    function TemplateUtil() {}

    /**
     * The default location of the template files relative to the root of the application server
     *
     * @property PATH
     * @type String
     * @static
     */
    TemplateUtil.PATH = '/templates';

    /**
     * The base URI to use if it differs from the location of the application
     *
     * @property BASE_URI
     * @type String
     * @static
     */
    TemplateUtil.BASE_URI = undefined;

    /**
     * Loads or fetches template file from cache, renders it
     * using underscore template method and returns a html
     * string
     *
     * @method render
     * @param templateName {String} The filename of the template without the file extension
     * @param templateData {Object} The data to be passed to the template method
     * @return {String} The final html string
     * */
    TemplateUtil.render = function(templateName, templateData) {
        if ( !$.cache ) {
            $.cache = {};
        }

        if ( ! $.cache[templateName] ) {
            var url = TemplateUtil.PATH + '/' + templateName + '.html';

            $.ajax({
                url: url,
                method: 'GET',
                async: false,
                success: function(data) {
                    $.cache[templateName] = _.template(data);
                }
            });
        }

        return $.cache[templateName](templateData);
    };

    // Scope Helper
    window.TemplateUtil = TemplateUtil;
}(window));