BigGif
======

Opensource version of maxgif.<br/>
Also works really well on mobile devices.<br/>

<h4>Demo</h4>
<p><a href="http://www.152.org">152.org</a></p>

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

<p>The plugin take two parameters. The first is the path to the image cache. The cache is a json document that contains an array of image locations. This property is required.</p>
<p>The second parameter is a callBack that runs after the background has been updated. This is not required.</p>

<p>You can look in the index.html file for an example of how to set it up.</p>

<h3>NOTES</h3>
<ul>
    <li>Don't leave spaces in the image names. Browsers don't seem to like that.</li>
</ul>

<h3>Missing features</h3>
<ul>
    <li>Browser crop.</li>
    <li>Auto advance.</li>
</ul>