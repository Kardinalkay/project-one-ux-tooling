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
    3b. Test if each element is in view but also importantly, out of view. An element is definitely
        in view if it's offset to the top is equal to that of the viewport's pageYOffset. This is 
        the definition of 'in view' in this case, regardless of if the element has an opacity of 0,
        has visibility hidden or is behind another element. And because the window's pageYOffset 
        changes on the scroll event, it must be inside the scroll function.
    3c. For each element that passes the 'in view' test, first 'unstyle' and active link.
        ii. Then find it's corresponding link in the navigation pane and highlight it.
        
    


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
                let $activeLinks = (opts.scrollspy.links);
                console.log($activeLinks);

                let windowH = window.innerHeight;
                
                const $targets = document.querySelectorAll($text + ', ' + $subtext);
                //console.log($targets);
                
                window.addEventListener('scroll', event =>  {   // listen to scroll on window
                    
                    let documentH = document.documentElement.scrollHeight;  // document Height (must always be inside event)
                    
                    let amtScrolled = window.scrollY    // amtScrolled
                    let ttlAvailable = documentH - windowH  // How much CAN be scrolled                   
                    
                    $targets.forEach ((el, index) => { 
                        
                        let $id = el.id;   // cache target IDs for each element
                        console.log("$id ", $id);
                        
                        // How tall is the $heading?
                        let hHeight = el.getBoundingClientRect().height

                        // How far is the element from the top
                        let hFromTop = el.getBoundingClientRect().top
                        
                        // 3b.

                        if (amtScrolled >= hFromTop && amtScrolled < hFromTop + hHeight) {
                            
                            // 3ci.
                            
                            if ($activeLinks) {
                                $activeLinks.forEach ((link, index) => {
                                    link.classList.remove("active");
                                });
                            }

                            
                            // 3cii.
                            let $activeLinkNew = document.querySelector('ul.parent-nav li a[href="#' + $id + '"]');
                            $activeLinkNew.classList.add("active");
                        }

                    }); 
                
                    
                });
                
            }

        }

    }
    
    const opts = {
        accordion : {
            heading: '.body-component > a',
            body: '.body-component'
        },
        progressbar : {
            progress: '.scroll-indicator'
        },
        scrollspy : {
            text: '.article-accordion > li',
            subtext: '.sub-text',
            activeLinks: document.querySelectorAll('ul.parent-nav li a.active')
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


   
    