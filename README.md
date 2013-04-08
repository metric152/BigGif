BigGif
======

Opensource version of maxgif.com.
Also works really well on mobile devices.

Requirements:
PHP 5 or higher
jQuery

The set up for this is pretty simple.

1) Dump your gifs in the images folder.
2) Make sure your images folder is set writable (chmod 644 images).
3) Hit [yourdomain.com]/cache.php to create a output cache of the images on the site. The cache is stored in the images folder. Use this domain to refresh the cache when new images are added.
4) Include jQuery in your page.
5) Include the bigGif plugin.
6) When the page is ready run the plugin.

You can look in the index.html file for an example of how to set it up.