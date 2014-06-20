BigGif
======

Opensource version of maxgif.<br/>
Also works really well on mobile devices.<br/>

Requirements:<br/>
PHP 5 or higher<br/>
jQuery<br/>

The set up for this is pretty simple.

<ol>
<li>Dump your gifs in the images folder.</li>
<li>Make sure your images folder is set writable (chmod 644 images).</li>
<li>Hit [yourdomain.com]/cache.php to create a output cache of the images on the site. The cache is stored in the images folder. Use this URL to refresh the cache when new images are added.</li>
<li>Include jQuery in your page.</li>
<li>Include the bigGif plugin.</li>
<li>When the page is ready run the plugin.</li>
</ol>

<p>
Options: <br/>
The plugin takes a object to configure itself.<br/>
<ul>
<li>jsonFile (required): the path to the image cache. The cache is a json document that contains an array of image locations. This property is required.</li>
<li>callback: A callBack that runs after the background has been updated.</li>
<li>timer: The amount of time in seconds an image will show. Default is 0.</li>
</ul>
</p>

<p>You can look in the index.html file for an example of how to set it up.</p>

<h3>NOTES</h3>
<ul>
    <li>Don't leave spaces in the image names. Browsers don't seem to like that.</li>
</ul>
