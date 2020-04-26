/*

1. ACCORDION

    1a. Listen for click on accordion-header and slide corresponding text down / up
    1b. When panel is visible, give user indication with the caret symbol by adding a class

2. PROGRESSBAR
    2a. Listen to scroll on the window and compute the amount scrolled as percentage of maximum
        scrollable height in percentage terms.
    2b. Set the value and aria values to progressbar.
    
3. SCROLLSPY
    3a. Loop through every link target ('.article-accordion > li' and .sub-text) and cache. This is 
        useful becauase the IDs are a bond between the anchor tags <a> and the target. The idea is 
        to get the IDs of every text or sub-text and tie the connection to the <a> elements. This
        will be relatively straightforward because the <a> tag already references them with the
        href attribute.
    


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
                
                let progress = (opts.progressbar.progress);            
                let $progress = document.querySelector(progress);
                              
                let windowH = window.innerHeight;   // window Height
                
                // 2a. 
                window.addEventListener('scroll', event => {
                    let documentH = document.documentElement.scrollHeight;  // document Height (must always be inside event)
                    
                    let amtScrolled = window.scrollY    // amtScrolled
                    let ttlAvailable = documentH - windowH  // How much CAN be scrolled
                    let percent = amtScrolled / ttlAvailable  // What percentage of the scrollable is scrolled : 0.5
                    
                    let progressWidth = Math.round(percent * 100);
                    
                    //2b. 
                    $progress.value = progressWidth;    // set width of progressbar
                    $progress.setAttribute("aria-valuenow", progressWidth); // set aria-width
                    
                    //2c. 
                    (progressWidth > 80) ? $progress.className = 'scroll-indicator concluding' : $progress.className = 'scroll-indicator';
                    
                });
            
            },
            
            scrollspy : function () {
                
                // 3a.
                
                let $text = (opts.scrollspy.text);
                let $subtext = (opts.scrollspy.subtext);
                
                const $targets = document.querySelectorAll($text + ', ' + $subtext);
                //console.log($targets);
                
                $targets.forEach ((element, index) => {    
                    let $id = element.id;
                    
                    //console.log($id);
                }); 
                
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
        },
        scrollspy : {
            text: '.article-accordion > li',
            subtext: '.sub-text'
        }
    }
    
    let article = doArticle(opts);

   // try {
        article.accordion();
        article.progressBar();
        article.scrollspy();
 /*   } catch (e) {
        console.warn("You have some error(s):")
        console.log(e.name);
        console.error(e.name);
    }*/


   
    