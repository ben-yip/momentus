# Introduction
- `jQuery.momentus` is a velocity/momentum event dispatcher for jQuery.
- This plugin monitors mouse-wheel, mouse-drag and swipe(on touch screen) gestures, along with momentum effects.  
- Easy to use and compatible with both desktop and mobile devices.
- A common usage scenario is to monitor the coordinates' changes (x or y) to implement any scrolling visual effects.
- Note that mouse-wheel scrolling only affects y-axis.

##### below are intro in Chinese.
- `jQuery.momentus` 是一个带有加速度效果的用户手势事件分发器；
- 依赖 jQuery，是一个 jQuery 插件；
- 本插件可以用于监听鼠标滚轮、鼠标拖动、以及在触屏设备上的滑动操作，其变化体现在x和y坐标的改变上；
- 手势操作程度越大，其加速度越大；
- 通常用来实现一些与滚动操作相关的视觉效果；
- 注意鼠标滚轮的动作只会对y轴坐标起效。

# Install
run `npm install --save momentus`

**Note:** jQuery is required and it's installed as a dependency.

# API and usage
```javascript
$('body').momentus({
    /**
    * {Number} mass : The unitless mass of this Momentus
    * (The larger the mass, the bigger the inertia)
    * (质量越大，惯性越大)
    * default : 1000
    */
    mass: 1000,
    
    /**
     * {Number} u : The friction coefficient
     * (the larger the friction, the quicker it stops)
     * (摩擦系数越大，越快停下)
     * default : 4
     */
    u: 4,
    
    /**
     * {Number} wheelRatio : The amount to divide mousewheel deltas by (to get desired sensitivity)
     * (滚轮灵敏度)
     * default : 1000
     */
    wheel_ratio: 1000,
    
    /**
     * {Number} mouseRatio : The amount to divide mousemove deltas by
     * (鼠标灵敏度)
     * default : 20
     */
    mouse_ratio: 20,
    
    /**
     * {Number} touchRatio : The amount to divide touchmove deltas by
     * (触摸灵敏度)
     * default : 1 
     */
    touch_ratio: 1,
    
    /**
     * {Function} onChange : Callback called when any change is made to position or velocity
     *    @param {Object} coordinates {x: current_x, y: current_y}
     *    @param {Object} velocity {x: current_vX, y: current_vY}
     *    
     * Make use of the changes of coordinates/velocity to let your app shine.
     */
    onChange: function (coordinates, velocity) {
        // console.log(coordinates);
        // console.log(velocity);
        // console.log('---------------');
    }
});
```

# Examples
Before checking out the examples in the repo, clone then run `npm install`. 
#### more examples
- [jQuery.momentus](https://codepen.io/Aldlevine/pen/yCrbA)
- [Price is Right Wheel - Better Inertia](https://codepen.io/Aldlevine/pen/yGLqd)
- [Custom Scroll with Momentum and Parallax](https://codepen.io/Aldlevine/pen/Jowke)

# Copyright 
- This plugin is originally written by [Aaron Levine](https://codepen.io/Aldlevine/), on Fri, 12/08/2017.  
- Since it can neither be found on Github nor NPM, I reckon it's good to share this great piece of code on these platforms.  
- Amendments might be made to this plugin in the future.
 
 