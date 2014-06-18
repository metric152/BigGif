(function($){

    function BigGif(images,callBack){
        this.images = [];
        this.img;
        this.callBack = callBack;
        this.queue = [];
        this.queueSize = 3;
        this.timer = 5; //5 secs. Set to 0 to stop it
        this.timerReference = null;
        this.paused = false;
        this.noticeLocation = {'position':'absolute','top':30,'left':15};
        this.style = {'padding': '10px','color': 'white', 'background-color': 'black'};
        this.loadingId = 'loading';
        this.pausedId = 'paused';
        
        // Make sure body is set up properly
        $('body').css({'margin':0,'padding':0,'height':'100%','cursor':'pointer'});
        
        $.getJSON(images,jQuery.proxy(function(data){
            // Set our results on the array
            this.images = data.images;
            
            // Show reload notice
            showReload.call(this);
            
            // Listen for hash changes
            $(window).on('popstate', $.proxy(uriChange, this));
            
            // Load an image
            if(getImageIndex() > 0){
                // Place the image
                loadImage.call(this, this.images[getImageIndex()]);
            }
            else {
                reload.call(this);
            }
            
                        
            // Update the image on resize
            $(window).resize(jQuery.proxy(update,this));
            
            // Hotkey for new image
            $(document).keyup(jQuery.proxy(function(event){
                if(event.keyCode == 32){
                    // Stop the timer if the screen was tapped or a key was pressed
                    stopTimer.call(this);
                    // Load new image
                    reload.call(this);
                }
            },this));
            
            // Make the body clickable
            $('body').click(jQuery.proxy(function(event){
                if(event.target.tagName.toLowerCase() === 'body'){
                    // If we're paused remove the notice and start the timer
                    if(this.paused){
                        this.paused = false;
                        $('#' + this.pausedId).remove()
                    }
                    // Stop the timer if the screen was tapped or a key was pressed
                    stopTimer.call(this);
                    // Load new image
                    reload.call(this);
                }
            },this));
        },this));
        
        // Start the timer if it's set up
        function startTimer(){
            if(this.timer > 0 && !this.paused){
                this.timerReference = setTimeout($.proxy(reload, this), this.timer * 1000);
            }
        }
        
        // Check to see if we're supposed to load an image from the URI
        function getImageIndex(){
            var imageIndex = 0;
            
            if(window.location.hash.length > 0){
                imageIndex = +window.location.hash.replace("#",'');
            }
            
            return imageIndex;
        }
        
        // Stop the timer
        function stopTimer(pauseTimer){
            var $paused = $('#paused');
            // Clear the timer
            if(this.timer > 0){
                clearTimeout(this.timerReference);
            }
            
            // Stop loading images
            if(pauseTimer){
                this.paused = true;
                // Display the play button
                if($paused.length == 0){
                    $paused = $('<span>', {'id': this.pausedId, 'text' : 'PAUSED. TAP TO START'}).css(this.noticeLocation).css(this.style);
                    $('body').prepend($paused);
                }
                // Remove the loading notice if it's still around
                if($('#' + this.loadingId).length >0){
                   $('#' + this.loadingId).remove(); 
                }
            }

        }
        
        // Listen for browser changes
        function uriChange(event, stopTheTimer){
            // The event was triggered when the URI was updated on image load. Ignore this.
            if(event.originalEvent.state == null) return;
            // Back or forward was pressed
            stopTimer.call(this, true);
            
            // Load the image in the state object
            loadImage.call(this,event.originalEvent.state.imageName, false);
        }
        
        // Create a queue that images are pulled from
        function buildQueue(){
            var imageStr = "";
            
            // Build up the queue
            for(var i = this.queue.length; i != this.queueSize; i++){
                // Get our image
                var image = this.images[Math.floor(Math.random() * this.images.length)];
                // Add it to the queue
                this.queue.push(image);
                // Build the css string
                imageStr += " url("+ image +")";
            }
            
            // Add an element used for caching
            if($('#preload').length === 0){
                $('body').append( $('<span>', {'id': 'preload'}) );
            }
            
            // Cache the images
            $('#preload').css({'display': 'none', 'content': imageStr});
        }
        
        // Load a random image
        function reload(){
            // Build the image cache queue
            buildQueue.call(this);
            
            // Place the image
            loadImage.call(this,this.queue.shift());
        }
        
        // Create the image and attach it to the page
        function loadImage(imgName, loadIntoHistory){
            loadIntoHistory = (typeof loadIntoHistory == 'boolean') ? loadIntoHistory : true;
            
            var $loading = $('<span>',{'id':this.loadingId ,'text':'LOADING'}).css(this.noticeLocation).css(this.style);
            $('body').prepend($loading);
            
            // Create a new image object once
            if(this.img == null) this.img = new Image();
            
            this.img.onload = jQuery.proxy(function(){
                // Apply the image to the background
                $('body').css({'background':'url('+imgName+') no-repeat center center'});
                
                // Update the URL
                if(loadIntoHistory){
                    window.history.pushState({'imageName': imgName}, null, "#" + $.inArray(imgName,this.images));
                } 
                
                // Fade the loading element
                $loading.fadeOut(1000,function(){
                    $(this).remove();
                });
                
                // Check to see if we should go to the next image automatically
                startTimer.call(this);
                // Update the background
                update.call(this);
                
                // If there is a callback run it
                if(this.callBack) this.callBack();
            },this);
            // Trigger the loading code
            this.img.src = imgName;
        }
        
        // Resize the image when the window does
        function update(){
            // Update the background image
            var deltaHeight = window.innerHeight/this.img.height;
            var deltaWidth = window.innerWidth/this.img.width;
            var delta;
            
            // Taller
            if(window.innerHeight > window.innerWidth){
                if(window.innerWidth > this.img.width * deltaHeight){
                    delta = deltaWidth;
                }
                
                else {
                    delta = deltaHeight;
                }
            }
            // Wider
            else {
                if(window.innerWidth > this.img.width * deltaHeight){
                    delta = deltaWidth;
                }
                else {
                    delta = deltaHeight;
                }
            }
            
            // Resize the background image
            $('body').css({'background-size':(this.img.width * delta)+'px ' + (this.img.height * delta)+'px'});
        } 
        
        // Create a reload notice
        function showReload(){
            var $span = jQuery('<span>',{'class':'notice','text':'PRESS SPACEBAR,CLICK/TOUCH SCREEN'}).css('position','absolute').css(this.style);
            $('body').prepend($span);
            // Center the notice
            var left = ($('body').width() - $span.width())/2;
            var top = ($('body').height() - $span.height())/2;
            $span.css({'top':top,'left':left}).fadeOut(5000,function(){
                $(this).remove();
            });
        }
    }

    // Make it a plugin
    jQuery.fn.extend({
        bigGif:BigGif
    });
})(jQuery);