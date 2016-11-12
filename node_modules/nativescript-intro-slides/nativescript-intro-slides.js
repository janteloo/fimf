"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var app = require('application');
var Platform = require('platform');
var absolute_layout_1 = require('ui/layouts/absolute-layout');
var stack_layout_1 = require('ui/layouts/stack-layout');
var button_1 = require('ui/button');
var AnimationModule = require('ui/animation');
var gestures = require('ui/gestures');
var Slide = (function (_super) {
    __extends(Slide, _super);
    function Slide() {
        _super.apply(this, arguments);
    }
    return Slide;
}(stack_layout_1.StackLayout));
exports.Slide = Slide;
var direction;
(function (direction) {
    direction[direction["none"] = 0] = "none";
    direction[direction["left"] = 1] = "left";
    direction[direction["right"] = 2] = "right";
})(direction || (direction = {}));
var IntroSlides = (function (_super) {
    __extends(IntroSlides, _super);
    function IntroSlides() {
        _super.call(this);
        this.direction = direction.none;
        this.constructView();
    }
    Object.defineProperty(IntroSlides.prototype, "loop", {
        get: function () {
            return this._loop;
        },
        set: function (value) {
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntroSlides.prototype, "pageWidth", {
        get: function () {
            return this._pageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntroSlides.prototype, "android", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IntroSlides.prototype, "ios", {
        get: function () {
            return;
        },
        enumerable: true,
        configurable: true
    });
    IntroSlides.prototype.constructView = function () {
        var _this = this;
        this._loaded = false;
        if (this._loop == null) {
            this.loop = false;
        }
        this.transitioning = false;
        this._pageWidth = Platform.screen.mainScreen.widthDIPs;
        this.on(absolute_layout_1.AbsoluteLayout.loadedEvent, function (data) {
            if (!_this._loaded) {
                _this._loaded = true;
                var slides_1 = [];
                _this.eachLayoutChild(function (view) {
                    if (view instanceof stack_layout_1.StackLayout) {
                        absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
                        view.width = _this.pageWidth;
                        view.height = '100%';
                        slides_1.push(view);
                    }
                });
                _this.currentPanel = _this.buildSlideMap(slides_1);
                _this.currentPanel.panel.translateX = -_this.pageWidth;
                _this.applySwipe(_this.pageWidth);
                app.on(app.orientationChangedEvent, function (args) {
                    _this._pageWidth = Platform.screen.mainScreen.widthDIPs;
                    _this.eachLayoutChild(function (view) {
                        if (view instanceof stack_layout_1.StackLayout) {
                            absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
                            view.width = _this.pageWidth;
                        }
                    });
                    _this.applySwipe(_this.pageWidth);
                    _this.currentPanel.panel.translateX = -_this.pageWidth;
                });
            }
        });
    };
    IntroSlides.prototype.nextSlide = function () {
        var _this = this;
        this.transitioning = true;
        this.showRightSlide(this.currentPanel).then(function () {
            _this.setupRightPanel();
        });
    };
    IntroSlides.prototype.previousSlide = function () {
        var _this = this;
        this.transitioning = true;
        this.showLeftSlide(this.currentPanel).then(function () {
            _this.setupLeftPanel();
        });
    };
    IntroSlides.prototype.setupLeftPanel = function () {
        this.direction = direction.none;
        this.transitioning = false;
        this.currentPanel.panel.off('pan');
        this.currentPanel = this.currentPanel.left;
        this.applySwipe(this.pageWidth);
    };
    IntroSlides.prototype.setupRightPanel = function () {
        this.direction = direction.none;
        this.transitioning = false;
        this.currentPanel.panel.off('pan');
        this.currentPanel = this.currentPanel.right;
        this.applySwipe(this.pageWidth);
    };
    IntroSlides.prototype.applySwipe = function (pageWidth) {
        var _this = this;
        var previousDelta = -1;
        this.currentPanel.panel.on('pan', function (args) {
            if (args.state === gestures.GestureStateTypes.ended) {
                if (_this.transitioning === false) {
                    _this.transitioning = true;
                    _this.currentPanel.panel.animate({
                        translate: { x: -_this.pageWidth, y: 0 },
                        duration: 250,
                    });
                    if (_this.currentPanel.right != null) {
                        _this.currentPanel.right.panel.animate({
                            translate: { x: 0, y: 0 },
                            duration: 250,
                        });
                        if (app.ios)
                            _this.currentPanel.right.panel.translateX = 0;
                    }
                    if (_this.currentPanel.left != null) {
                        _this.currentPanel.left.panel.animate({
                            translate: { x: -_this.pageWidth * 2, y: 0 },
                            duration: 250,
                        });
                        if (app.ios)
                            _this.currentPanel.left.panel.translateX = -_this.pageWidth;
                    }
                    if (app.ios)
                        _this.currentPanel.panel.translateX = -_this.pageWidth;
                    _this.transitioning = false;
                }
            }
            else {
                if (!_this.transitioning && previousDelta !== args.deltaX && args.deltaX != null && args.deltaX < -5) {
                    if (_this.currentPanel.right != null) {
                        _this.direction = direction.left;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.right.panel.translateX = args.deltaX;
                        if (args.deltaX < ((pageWidth / 3) * -1)) {
                            _this.transitioning = true;
                            _this.showRightSlide(_this.currentPanel, args.deltaX).then(function () {
                                _this.setupRightPanel();
                            });
                            ;
                        }
                    }
                }
                if (!_this.transitioning && previousDelta !== args.deltaX && args.deltaX != null && args.deltaX > 5) {
                    if (_this.currentPanel.left != null) {
                        _this.direction = direction.right;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.left.panel.translateX = -(_this.pageWidth * 2) + args.deltaX;
                        if (args.deltaX > pageWidth / 3) {
                            _this.transitioning = true;
                            _this.showLeftSlide(_this.currentPanel, args.deltaX).then(function () {
                                _this.setupLeftPanel();
                            });
                        }
                    }
                }
                if (args.deltaX !== 0) {
                    previousDelta = args.deltaX;
                }
            }
        });
    };
    IntroSlides.prototype.showRightSlide = function (panelMap, offset) {
        if (offset === void 0) { offset = 0; }
        var transition = new Array();
        transition.push({
            target: panelMap.right.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: 300,
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: -this.pageWidth * 2, y: 0 },
            duration: 300,
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    IntroSlides.prototype.showLeftSlide = function (panelMap, offset) {
        if (offset === void 0) { offset = 0; }
        var transition = new Array();
        transition.push({
            target: panelMap.left.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: 300,
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: 0, y: 0 },
            duration: 300,
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    IntroSlides.prototype.buildFooter = function () {
        var footer = new absolute_layout_1.AbsoluteLayout();
        var footerInnerWrap = new stack_layout_1.StackLayout();
        var footerInnerWrapLeft = new stack_layout_1.StackLayout();
        var footerInnerWrapMiddle = new stack_layout_1.StackLayout();
        var footerInnerWrapRight = new stack_layout_1.StackLayout();
        this.setwidthPercent(footer, 100);
        footerInnerWrap.orientation = 'horizontal';
        this.setwidthPercent(footerInnerWrap, 100);
        footer.addChild(footerInnerWrap);
        this.setwidthPercent(footerInnerWrapRight, 30);
        this.setwidthPercent(footerInnerWrapLeft, 30);
        this.setwidthPercent(footerInnerWrapMiddle, 40);
        footerInnerWrapLeft.addChild(this.newFooterButton('Previous'));
        footerInnerWrapRight.addChild(this.newFooterButton('Next'));
        footerInnerWrap.addChild(footerInnerWrapLeft);
        footerInnerWrap.addChild(footerInnerWrapMiddle);
        footerInnerWrap.addChild(footerInnerWrapRight);
        return footer;
    };
    IntroSlides.prototype.setwidthPercent = function (view, percentage) {
        view.width = percentage + '%';
    };
    IntroSlides.prototype.newFooterButton = function (name) {
        var button = new button_1.Button();
        button.id = 'btn-info-' + name.toLowerCase();
        button.text = name;
        this.setwidthPercent(button, 100);
        return button;
    };
    IntroSlides.prototype.buildSlideMap = function (views) {
        var slideMap = [];
        views.forEach(function (view) {
            slideMap.push({
                panel: view
            });
        });
        slideMap.forEach(function (mapping, index) {
            if (slideMap[index - 1] != null)
                mapping.left = slideMap[index - 1];
            if (slideMap[index + 1] != null)
                mapping.right = slideMap[index + 1];
        });
        if (this.loop) {
            slideMap[0].left = slideMap[slideMap.length - 1];
            slideMap[slideMap.length - 1].right = slideMap[0];
        }
        return slideMap[0];
    };
    return IntroSlides;
}(absolute_layout_1.AbsoluteLayout));
exports.IntroSlides = IntroSlides;
//# sourceMappingURL=nativescript-intro-slides.js.map