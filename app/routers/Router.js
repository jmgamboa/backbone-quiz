//Router
define(
    [
        'jquery',
        'backbone',
        'views/ScoreView',
        'views/HomeView',
        'views/QuizView'
    ],
    function ($, Backbone, ScoreView, HomeView, QuizView) {
        'use strict';

        var Router = Backbone.Router.extend({
            quizView : null,
            routes: {
                ""              :   "home",
                "home"          :   "home",
                "quiz/q:qno"    :   "quiz",
                "score"         :   "score",
                "*actions"      :   "error"
            },

            home: function () {
                var homeView = new HomeView();
                $("#wrapper").html(homeView.render().el);
                this.quizView = null;
            },

            quiz : function (qno) {
                if (this.quizView === null) {
                    this.quizView = new QuizView();
                    $("#wrapper").html(this.quizView.render().el);
                }
                this.quizView.showQuestion(qno);
            },

            score : function () {
                var scoreView = new ScoreView();
                $('#wrapper').html(scoreView.render().el);
                this.quizView = null;
            },

            error : function () {
                $('#wrapper').html("Error");
                this.quizView = null;
            }
        });

        return Router;
    }
);