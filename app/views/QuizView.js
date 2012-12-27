/*Quiz View*/

define(
    [
        'jquery',
        'backbone',
        'fixtures/quiz',
        'collections/QuestionsCollection',
        'views/QuestionsView',
        'models/QuizModel'
    ],
    function ($, Backbone, QuizData, QuestionsCollection, QuestionsView, QuizModel) {

        'use strict';

        var QuizView = Backbone.View.extend({

            id: "quiz_view",
            className: "section",
            model : null,
            questionsCollection : null,
            questionsView : null,

            initialize: function () {
                this.model = new QuizModel({
                    time : QuizData.time,
                    randomized : QuizData.randomized
                });
            },

            render: function () {

                //Create a new QuestionsCollection
                this.questionsCollection = new QuestionsCollection();
                //Create a new questionsView
                this.questionsView = new QuestionsView({collection : this.questionsCollection, model : this.model});
                //Set data in questionsCollection
                if (this.model.get('randomized')) {
                    this.questionsCollection.reset(_.shuffle(QuizData.questions));
                } else {
                    this.questionsCollection.reset(QuizData.questions);
                }
                $(this.el).html(this.questionsView.render().el);
                return this;
            },

            events : {
                'click li.answer' : "answerSelected",
                'keyup input.answer' : "answerSelected"
            },

            answerSelected : function (event) {
                var responseEle = $(event.target);
                if (responseEle.get(0).tagName === "LI") {
                    if (!responseEle.hasClass('active')) {
                        responseEle.addClass('active');
                        responseEle.siblings().removeClass('active');
                        this.response = responseEle.text();
                        //this.activateNext();
                    }
                }// else if (responseEle.get(0).tagName === "INPUT") {
                    //if (responseEle.val().length > 0) {
                        //this.activateNext();
                    //} else {
                        //this.deactivateNext();
                    //}
                //}
            },

            showQuestion : function (qno) {
                this.currentIndex = qno;
                this.questionsView.showQuestion(qno);
                $(this.el).html(this.questionsView.el);
            },
            activateNext: function () {

            },
            deactivateNext: function () {

            },
            next: function () {

            }
        });

        return QuizView;
    }
);