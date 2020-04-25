/*

1. ACCORDION

    1a. Listen for click on accordion-header and slide corresponding text down / up
    1b. When panel is visible, give user indication with the caret symbol by adding a class

2. PROGRESSBAR
    2a. 


*/


    const doArticle = function(opts) {

        var sec;
        
        return {

            accordion : function () {
                
                let $heading = (opts.accordion.heading);
                let $body = (opts.accordion.body);

                //1a. 
                const artcl = document.querySelectorAll($body);           // body
                const artclHead = document.querySelectorAll($heading);   // heading

                for (let i = 0; i < artclHead.length; i++) {    // cycle through accordion headers
                    artclHead[i].addEventListener('click', function() {
                        let el = this;
                        togglePanel(el);
                });


                function togglePanel (el) {
                    
                    event.preventDefault();
                    //1b. 
                    
                    let bodyComponent = el.parentNode.className;  // get parent class                    
                    for (let i = 0; i < artcl.length; i++) {    // close all panels
                        artcl[i].className = 'body-component close';
                    } 
                                        
                    // toggle on click                                        
                    (bodyComponent == 'body-component close') ? el.parentNode.className = 'body-component open' : el.parentNode.className = 'body-component close';

                    }   
                    
                }

            },
            
            progressBar : function () {
                
                const progress = (opts.progressbar.progress);            
                const $progress = document.querySelector(progress);
                              
                const windowH = window.innerHeight;   // window Height
                const documentH = document.documentElement.scrollHeight;  // document Height
                const amtScrolled = window.scrollY    // amtScrolled
                const ttlAvailable = documentH - windowH  // How much CAN be scrolled
                const percent = amtScrolled / ttlAvailable  // What percentage of the scrollable is scrolled : 0.5
                            
                console.log($progress);
                
                window.addEventListener('scroll', event => {
                }
            
            }

        }

    }
    
    const opts = {
        accordion : {
            heading: '.body-component > a',
            body: '.body-component',
        },
        progressbar : {
            progress: '.scroll-indicator',
        }
    }
    
    let article = doArticle(opts);

    try {
        article.accordion();
        article.progressBar();
    } catch (e) {
        console.warn("You have some error(s):")
        console.log(e.name);
        console.error(e.name);
    }


   
    