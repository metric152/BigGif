(function($){

    function BigGif(images,callBack){
        this.images = [];
        this.img;
        this.callBack = callBack;
        this.queue = [];
        this.queueSize = 10;
        
        // Make sure body is set up properly
        $('body').css({'margin':0,'padding':0,'height':'100%','cursor':'pointer'});
        
        $.getJSON(images,jQuery.proxy(function(data){
            // Set our results on the array
            this.images = data.images;
            
            // Show reload notice
            showReload();
            
            // Show the image in the url
            if(window.location.hash.length > 0){
                buildQueue.call(this);
                index = window.location.hash.replace("#",'');
                loadImage.call(this,this.images[index]);
            }
            // Load a new one
            else{
                reload.call(this);
            }
                        
            // Update the image on resize
            $(window).resize(jQuery.proxy(update,this));
            
            // Hotkey for new image
            $(document).keyup(jQuery.proxy(function(event){
                if(event.keyCode == 32){
                    reload.call(this);
                }
            },this));
            // Make the body clickable
            $('body').click(jQuery.proxy(function(event){
                if(event.target.tagName.toLowerCase() === 'body'){
                    reload.call(this);
                }
            },this)); 
            
        },this));
        
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
            if($('.preload').length === 0){
                $('body').append( $('<span>', {'class': 'preload'}) );
            }
            
            // Cache the images
            // http://www.thecssninja.com/css/even-better-image-preloading-with-css2
            $('.preload').css({'display': 'none', 'content': imageStr});
        }
        
        // Load a random image
        function reload(){
            // Build the image cache queue
            buildQueue.call(this);
            
            // Place the image
            loadImage.call(this,this.queue.shift());
        }
        
        // Create the image and attach it to the page
        function loadImage(imgName){
            var loading = $('<span>',{'class':'loading','text':'LOADING'}).css({'position':'absolute','top':0,'left':75});
            $('body').prepend(loading);
            
            // Create a new image object once
            if(this.img == null) this.img = new Image();
            
            this.img.onload = jQuery.proxy(function(){
                // Apply the image to the background
                $('body').css({'background':'url('+imgName+') no-repeat center center'});
                
                // Update the URL
                window.location.hash = $.inArray(imgName,this.images);
                loading.fadeOut(1000,function(){
                    $(this).remove();
                });
                
                update.call(this);
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
            
            $('body').css({'background-size':(this.img.width * delta)+'px ' + (this.img.height * delta)+'px'});
            if(this.callBack) this.callBack();
        } 
        
        // Create a reload notice
        function showReload(){
            var span = jQuery('<span>',{'class':'notice','text':'PRESS SPACEBAR,CLICK/TOUCH SCREEN'}).css('position','absolute');
            $('body').prepend(span);
            // Center the notice
            var left = ($('body').width() - span.width())/2;
            var top = ($('body').height() - span.height())/2;
            span.css({'top':top,'left':left}).fadeOut(5000,function(){
                $(this).remove();
            });
        }
    }

    // Make it a plugin
    jQuery.fn.extend({
        bigGif:BigGif
    });
})(jQuery);
