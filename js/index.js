
/*

1. ACCORDION

    1a. Listen for click on accordion-header and slide corresponding text down / up




*/


    var article = function(name) {

        var sex;

            return {
                
                accordion : function () {
                    //let artcl = document.querySelectorAll('.body-component');
                    let artclHead = document.querySelectorAll('.body-component > a');
                    
                    for (i = 0; i < artclHead.length; i++) {
                        artclHead[i].addEventListener('click', togglePanel, false);
                    }
                    
                    function togglePanel () {
                        
                    }
                    
                }
          }

    }

    