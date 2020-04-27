/*

1. ACCORDION

    1a. Listen for click on accordion-header and slide corresponding text down / up.
    1b. When panel is visible, give user indication with the caret symbol by adding a class.
    1c. When navigation link is clicked, save its href value, prevent default action.
    1d. Select target: If .sub-text, select destination, navigate (up) to the accordion-header and trigger click.
    1e. If .text, then accessing the parent accordion would take a different route
        so account for this and find a way to accordion-header to trigger click on it.
    1f. Remove active class responsible for styling link, for any new link clicked.
    1g. Also remove focus on all previously clicked links for any new link clicked to prevent confusion.
    1h. Only trigger click if the tab is closed.
    1i. Otherwise, finally scroll the element into view by scrolling the document its pageOffsetY 
        + the element's offset top's value.
    1j. Account for padding-top on body element.
    
2. PROGRESSBAR
    2a. Listen to scroll on the window and compute the amount scrolled as percentage of maximum
        scrollable height in percentage terms.
    2b. Set the value and aria values to progressbar.

    2c. If progress width is above 80%, add a class that gives user visual indication he's 
        almost done with the content. This indication will be a delegated CSS class that will
        increase the filter blur on the element as well as increase it's blink rate (animation speed)
    
3. SCROLLSPY
  3a. Loop through every link target ('.article-accordion > li' and .sub-text) and cache. This is 
      useful becauase the IDs are a bond between the anchor tags <a> and the target. The idea is 
      to get the IDs of every text or sub-text and tie the connection to the <a> elements. This
      will be relatively straightforward because the <a> tag already references them with the
      href attribute.
  3b. Test if each element is in view but also importantly, out of view. An element is definitely
      in view if it's offset to the top is 0. This is 
      the definition of 'in view' in this case, regardless of if the element has an opacity of 0,
      has visibility hidden or is behind another element. And because the window's pageYOffset 
      changes on the scroll event, it must be inside the scroll function.
  3c. For each element that passes the 'in view' test, first 'unstyle' any active link.
      ii. Then find it's corresponding link in the navigation pane and highlight it.
  3d. Ensure that only 1 link is styled at a time by halting the loop once a target is in view.
    
4.  WORDCOUNT
  4a. Cache approximate words per minute for steady reader and fast reader.
  4b. Fetch all text from article.
  4c. Trim whitespace (important).
    
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
                    
                };
                
                // 1c.
                
                let $activeLink = document.querySelectorAll('ul.parent-nav li a');  // Select nav links

                for (let i = 0; i < $activeLink.length; i++) {
                    
                    $activeLink[i].addEventListener('click', function() {
                        let el = this;
                        activatePanel(el);
                    });
                                                    
                    function activatePanel (el, defaultBehaviour=false) {  // Listen to click on navigation menu link 
                        
                        event.preventDefault();
                        
                        let href = el.href.split("#")[1]; // get the hash part of the href
                        href = '#' + href; // add octothorpe back
                        // console.log(href);  // #understand-competition
                          
                        let $activeLinks = document.querySelectorAll('ul.parent-nav li a.active');
                        
                        // 1f.
                        
                        if ($activeLinks) {
                            $activeLinks.forEach((link, index) => {
                                link.classList.remove("active");    
                                link.blur();    //1g.
                            });
                        }

                        
                        let $activeLinkNew = document.querySelector('ul.parent-nav li a[href="' + href + '"]');
                        $activeLinkNew.classList.add("active");
                        
                        // 1d. 
                        let $target = document.querySelector(href);  
                        let $accTab = '';
                        
                        //1h.
                        let $panelOpen = false;
                        let $bodyComponent = '';
                        
                        // 1e. If it was a sub-link that was clicked, then go to its destination and travel up the 
                        // DOM tree to find the accordion head, and trigger-click. 
                        
                        // But if it was parent link that was clicked, no need to climb the DOM because it links 
                        if ($activeLink[i].parentNode.parentNode.classList.contains('parent-nav')) {   // test if parent link
                            $accTab = $target.children[0].children[0];
                            //console.log($bodyComponent);
                            // console.log($accTab);
                                                    
                        } else {
                            $accTab = $target.parentNode.parentNode.previousElementSibling;
                            //console.log($target);   // li#understand-competition
                            //console.log($accTab);   // <a href="#understand-competition"></a>   
                        }
                        
                        // Only if the panel is closed should a click be triggered to open it                         
                        $bodyComponent = ($accTab.parentElement).classList.contains('close');
                        if ($bodyComponent) {
                            $accTab.click();   // trigger click on accordion tab   
                        }
                        
                        // 1i. 
                        //element in view would be its offset to window top + windows offset to document top
                        $scrollIntoView = $target.getBoundingClientRect().top + window.scrollY;
                        // console.log($scrollIntoView);
                        
                        window.scrollTo({
                            top: Math.round($scrollIntoView) - 145, // 1j.
                            left: 0,
                            behaviour: 'smooth'
                        });
                                                
                    };
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
                let windowH = window.innerHeight;
                
                //console.log($targets);
                
                window.addEventListener('scroll', event =>  {   // listen to scroll on window
                    
                    let $activeLinks = document.querySelectorAll('ul.parent-nav li a.active');
                    const $targets = document.querySelectorAll($text + ', ' + $subtext);
                    
                    let documentH = document.documentElement.scrollHeight;  // document Height (must always be inside event)
                    
                    let amtScrolled = Math.round(window.scrollY);    // amtScrolled

                    for (let i = 0; i < $targets.length; i++) {
                        
                        let el = ($targets[i]);
                        
                        let $id = el.id;   // cache target IDs for each element
                        
                        // How tall is the $heading?
                        let hHeight = Math.round(el.getBoundingClientRect().height);

                        // How far is the element from the top
                        let hFromTop = Math.round(el.getBoundingClientRect().top);
                        
                        // 3b.
                        // Account for 125px padding-top on body used to cater for the floating 
                        // header and widget panel
                        if (hFromTop > 125 && hFromTop < 425) { 
                            
                            //alert (hFromTop + "," + (amtScrolled) + ", " + $id);
                            // 3ci.
                            if ($activeLinks) {
                                $activeLinks.forEach ((link, index) => {
                                    link.classList.remove("active");
                                    link.blur();
                                });
                            }

                            // 3cii.
                            let $activeLinkNew = document.querySelector('ul.parent-nav li a[href="#' + $id + '"]');
                            $activeLinkNew.classList.add("active");
                            
                            // 3d.
                            break;
                           
                        }
                       
                    }; 
                
                    
                });
                
            },
            
            wordcount : function () {
                
                // 4a. 
                
                const steady = (opts.wordcount.steady); //200
                const fast = (opts.wordcount.fast); // 250
                let $text = (opts.scrollspy.text);  // article text
                $text = document.querySelectorAll($text);
                let textPieces = '';
                
                // 4b. 
                
                $text.forEach(($text, index) => {
                    textPieces += $text.textContent;    // concatenate
                });   
                
                let wordLength = (textPieces.trim().length);
                console.log(wordLength);
                                
                
            }

        }

    }
    
    const opts = {
        accordion : {
            heading: '.body-component > a',
            body: '.body-component',
            navlink: ''
        },
        progressbar : {
            progress: '.scroll-indicator'
        },
        scrollspy : {
            text: '.article-accordion > li',
            subtext: '.sub-text',
        },
        wordcount : {
            steady: 200,
            fast: 250
        }
    }
    
    let article = doArticle(opts);

   // try {
        article.accordion();
        article.progressBar();
        article.scrollspy();
        article.wordcount();
 /*   } catch (e) {
        console.warn("You have some error(s):")
        console.log(e.name);
        console.error(e.name);
    }*/


   
    