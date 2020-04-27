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
  4d. Remove whitespace as a result of HTML.
  4e. Compute time by dividing total words by approximate reading time / min.
  4f. Place the values in the document.
  
5. FIXED HEADING ON SCROLL
  5a. Check if heading is in view.
  5b. Reference the heading and showbox and insert heading inside showbox.
  5c. Display new heading when user scrolls into view.
  
6. SCROLL TO END BUTTON
  6a. Determine when button will be visible. (Now this is by discretion unlike the other methods.
        About one and a half times the height of the viewport from the top of document seems apt)
  6b. Button should be visible but should scroll down if close to document top.
  6c. Button should scroll up if viewport is at the base of document.
   
7. CUSTOM PAGE SLIDER
  7a. Listen to input on slider and fetch it's value.
  7b. Express %value of slider as literal approximate pixel value of scrollable height.
  
  
*/


    const doArticle = function(opts) {
        
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
                            behavior: 'smooth'
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
                
                //console.log($targets);
                
                window.addEventListener('scroll', event =>  {   // listen to scroll on window
                    
                    let windowH = window.innerHeight;
                    
                    let $activeLinks = document.querySelectorAll('ul.parent-nav li a.active');
                    const $targets = document.querySelectorAll($text + ', ' + $subtext);
                                        
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
                
                // 4c. "a b c" => [a, b, c]
                let words = (textPieces.trim().split(" "));
                
                // 4d.
                words = words.filter(Boolean); // Eliminate whitespace brought about by HTML markup
                wordLength = words.length;
                
                // 4e. Compute average time
                let steadyTime = Math.round(wordLength / steady);
                let fastTime = Math.round(wordLength / fast);
                                
                if (isNaN(steadyTime) || isNaN(fastTime)) {
                    throw Error ('WORD COUNT NOT RETURNING NUMBERS');
                }
                
                // 4f. Place values in HTML
                
                let steadyID = opts.wordcount.steadyElm;
                let fastID = opts.wordcount.fastElm;
                
                let steadyElm = document.querySelector(`span${steadyID}`);
                let fastElm = document.querySelector(`span${fastID}`);
                
                steadyElm.innerText = steadyTime + 'minutes';
                fastElm.innerText = fastTime + 'minutes';
                
            },
            
            fixedHeading : function () {
                
                // Select the headings
                $text = opts.scrollspy.text;
                $subtext = opts.scrollspy.subtext;
                                                
                window.addEventListener('scroll', event =>  {   // listen to scroll on window
                    
                    let windowH = window.innerHeight;
                    
                    let $headings = document.querySelectorAll(`${$text}, ${$subtext}`);
                    
                    for (let i = 0; i < $headings.length; i++) {
                        
                        let $el = ($headings[i]);
                        
                        let id = $el.id;
                        //console.log($el);
                                            
                        let hFromTop = Math.round($el.getBoundingClientRect().top);
                        
                        // Check if heading is in view 
                        
                        if (hFromTop > 125 && hFromTop < 165) { // title in view?
                            
                            let headingTitle = '';  
                            // Cater for inconsistency in DOM in order to fetch necessary title
                            if ($el.classList.contains('sub-text')) {//reference heading title
                                headingTitle = $el.children[0].textContent;

                            } else {
                                headingTitle = ($el.children[0].children[0].children[0]).textContent;
                            }

                            //console.log(headingTitle);
                            //reference showbox
                            const $temporaryHeader = document.querySelector(opts.fixedHeading.header);
                            
                            $temporaryHeader.innerText = headingTitle;
                            // 5c. Display new heading when user scrolls into view
                            if (!$temporaryHeader.parentElement.classList.contains("slide")) {  // Ensure not to apply the class twice
                                $temporaryHeader.parentElement.classList += " slide"; 
                            }
                                                        
                           // break;
                           
                        } else if (hFromTop > 145) {
                            
                           // remove class 
                            
                        }
                        
                    }
                    
                });
                
            },
            
            scrolltoEnd : function () {
                
                let btn = (opts.scrollToEnd.Btn);
                
                window.addEventListener('scroll', event =>  {   // listen to scroll on window
                    
                    let windowH = window.innerHeight;  
                    let documentH = document.documentElement.scrollHeight;  // document Height (must always be inside event)
                    let ttlAvailable = documentH - windowH;  // How much CAN be scrolled
                    
                    let amtScrolled = Math.round(window.scrollY);    // amtScrolled
                    
                    let btn = document.querySelector(opts.scrollToEnd.btn);
                    //console.log(btn);
                    
                    // 6a. (1.5 times the viewport's height from the document top and not yet at end of document)
                    if (amtScrolled > (1.5 * windowH) && (amtScrolled < (ttlAvailable - windowH))) {
                        // Avoid styling twice
                        !(btn.classList.contains("is-visible")) ? btn.classList += " is-visible" : btn.classList += '';
                        (btn.classList.contains("up")) ? btn.classList.remove("up") : btn.classList += '';
                        
                        // 6b. Listen for click to send page down
                        btn.addEventListener('click', () => {
                            scroll('down');
                        });
                                                
                    }   // viewport at the very base of document
                    else if (amtScrolled > (ttlAvailable - windowH) && amtScrolled < (ttlAvailable) ) {    // 6b.
                        // rotate button and prime for scrolling down 
                        !(btn.classList.contains("is-visible")) ? btn.classList += " is-visible" : btn.classList += '';
                        !(btn.classList.contains("up")) ? btn.classList += " up" : btn.classList += '';
                        
                        // Listen for click to send page up
                        btn.addEventListener('click', () => {
                           scroll('up');  
                        });
                       
                    }
                    
                    scroll = (dir) => {    // 
                        (dir==='up') ? document.documentElement.scrollTop = 0 : document.documentElement.scrollTop = ttlAvailable; 
                    }
                
                });
                
                // 6b. 
            
            },
            
            pageSlider : function () {
                
                const $slider = document.getElementById(opts.pageSlider.slider);

                let windowH = window.innerHeight;  
                let documentH = document.documentElement.scrollHeight;  // document Height (must always be inside event)
                let ttlAvailable = documentH - windowH;  // How much CAN be scrolled

                let amtScrolled = Math.round(window.scrollY);    // amtScrolled
                    
                
                /*The idea is to fetch the value of the slider when dragged. The current value of the slider
                will be expressed as a percentage. Then this percentage will serve as the same percentage of
                the page's scrollable Height. Then with native methods like scollTo(), or scrollIntoVieew(),
                the page will be scrolled to the exact corresponding point by using that percentage to evaluate
                the window approximate pixel y-position.*/
                
                $slider.oninput = () => {
                    
                    alert ('working');
                    
                    let sliderVal = $slider.value;                    
                    $sliderPcntVal = sliderVal / 100;   // express value in % terms
                    
                    // Express %value of slider as literal approximate pixel value of scrollable height
                    ttlAvailablePcnt = $sliderPcntVal * ttlAvailable;
                    
                    console.log(sliderVal);
                    
                };
                
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
            fast: 250,
            steadyElm: '#steady-reader',
            fastElm: '#fast-reader'
        },
        fixedHeading : {
            header: '.heading-temporary > span:first-of-type'            
        },
        scrollToEnd : {
            btn: '.scrollToEndBtn'
        },
        pageSlider : {
            slider: 'article-scroller'
        }
    }
    
    let article = doArticle(opts);

   /* try {*/
        article.accordion();
        article.progressBar();
        article.scrollspy();
        article.wordcount();
        article.fixedHeading();
        article.scrolltoEnd();
        article.pageSlider();
    /*} catch (e) {
        console.warn("You have some error(s):")
        console.log(e.name);
        console.error(e.name);
    }
*/

   
    