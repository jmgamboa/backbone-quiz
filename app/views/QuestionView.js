/*Question View*/

define(
    [
        'jquery',
        'underscore',
        'backbone',
        'text!templates/QuestionViewTemplate.html'
    ],
    function ($, _, Backbone, QuestionViewTemplate) {

        'use strict';

        var QuestionView = Backbone.View.extend({
            id : "question_view",
            template : _.template(QuestionViewTemplate),

            initialize: function () {

            },

            render: function () {
                $(this.el).html(this.template(this.model.toJSON()));
                return this;
            }

        });

        return QuestionView;
    }
);