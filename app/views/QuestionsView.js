/*Questions View*/

define(
    [
        'underscore',
        'backbone',
        'views/QuestionView',
        'text!templates/QuestionsViewTemplate.html'
    ],
    function(_, Backbone, QuestionView, QuestionsViewTemplate){
        
        var QuestionsView = Backbone.View.extend({
            totalQuestions : null,
            template : _.template(QuestionsViewTemplate),
            
            initialize:function(){
                _.bindAll(this, 'render');
                
                this.collection.on('reset', this.render);
            },
            
            render:function(){
                totalQuestions = this.collection.length;
                $(this.el).html(this.template({
                    "current" : 0,
                    "total" : totalQuestions,
                    "next" : 0,
                    "prev" : 0
                }));
                return this;
            },
            
            showQuestion : function(qno) {
                qno = parseInt(qno);
                if(qno <= totalQuestions) {
                    //Create new QuestionView with the question model
                    var questionView = new QuestionView({model : this.collection.at(qno - 1)});
                    $(this.el).html(this.template({
                        "current" : qno,
                        "total" : totalQuestions
                    }));
                    $(this.el).find('.content').html(questionView.render().el);
                } else {
                    
                }
            }
            
        });
        
        return QuestionsView;
    }
);