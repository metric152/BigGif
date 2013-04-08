BigGif
======

Opensource version of maxgif.com.<br/>
Also works really well on mobile devices.<br/>

Requirements:<br/>
PHP 5 or higher<br/>
jQuery<br/>

The set up for this is pretty simple.

<ol>
<li>Dump your gifs in the images folder.</li>
<li>Make sure your images folder is set writable (chmod 644 images).</li>
<li>Hit [yourdomain.com]/cache.php to create a output cache of the images on the site. The cache is stored in the images folder. Use this domain to refresh the cache when new images are added.</li>
<li>Include jQuery in your page.</li>
<li>Include the bigGif plugin.</li>
<li>When the page is ready run the plugin.</li>
</ol>

You can look in the index.html file for an example of how to set it up.