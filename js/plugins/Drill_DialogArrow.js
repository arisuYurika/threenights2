//=============================================================================
// Drill_DialogArrow.js
//=============================================================================

/*:
 * @plugindesc [v1.2]        对话框 - 对话框小箭头
 * @author Drill_up
 * 
 * @Drill_LE_param "小箭头-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_DAr_list_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_DialogArrow +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以修改对话框的小箭头位置以及样式。
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：战斗界面、地图界面。
 *   作用于对话框。
 * 小箭头：
 *   (1.在对话框显示全部字符完毕后，小箭头才会显现。
 *      注意，小箭头只针对对话框作用。
 *   (2.你可以切换样式来控制不同风格的小箭头。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Menu__ui_message （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Menu__ui_message文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 *
 * 小箭头1 资源-小箭头GIF
 * 小箭头2 资源-小箭头GIF
 * 小箭头3 资源-小箭头GIF
 * ……
 *
 * 所有素材都放在Menu__ui_message文件夹下。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定
 * 你可以通过插件指令控制对话框小箭头：
 * 
 * 插件指令：>对话框小箭头 : 显示
 * 插件指令：>对话框小箭头 : 隐藏
 * 插件指令：>对话框小箭头 : 修改样式 : 样式[1]
 * 插件指令：>对话框小箭头 : 恢复默认箭头
 * 
 * 1."样式"中表示对应配置的小箭头编号。
 * 2."恢复默认箭头"表示默认的小箭头。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(n)*o(贴图处理) 每帧
 * 测试方法：   开启小箭头，去各个管理层测试性能。
 * 测试结果：   200个事件的地图中，平均消耗为：【5ms以下】
 *              100个事件的地图中，平均消耗为：【5ms以下】
 *               50个事件的地图中，平均消耗为：【5ms以下】
 * 测试方法2：  战斗界面 变换场景 中测试。
 * 测试结果2：  战斗界面中，平均消耗为：【11.42ms】
 * 
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.由于对话框中只有小箭头这一个贴图，所以几乎没有消耗。
 *   战斗界面突然多出来的消耗，可能是垃圾电脑本身资源不够造成的。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件指令细节。
 * [v1.2]
 * 优化了旧存档的识别与兼容。
 * 
 * 
 *
 * @param 是否初始显示
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 当前小箭头
 * @type number
 * @min 0
 * @desc 当前对应的小箭头，0表示默认的小箭头。
 * @default 0
 * 
 * @param ----小箭头----
 * @default 
 *
 * @param 小箭头-1
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-2
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-3
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-4
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-5
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-6
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-7
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-8
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-9
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 *
 * @param 小箭头-10
 * @parent ----小箭头----
 * @type struct<DrillDArSprite>
 * @desc 当前小箭头的样式配置。
 * @default 
 * 
 */
/*~struct~DrillDArSprite:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的小箭头样式==
 * 
 * @param ---贴图---
 * @default 
 *
 * @param 资源-小箭头GIF
 * @parent ---贴图---
 * @desc 小箭头的图片资源，可以是单张图片，也可以是多张组合的gif。
 * @default []
 * @require 1
 * @dir img/Menu__ui_message/
 * @type file[]
 *
 * @param 帧间隔
 * @parent ---贴图---
 * @type number
 * @min 1
 * @desc gif每帧播放间隔时间，单位帧。（1秒60帧）
 * @default 4
 *
 * @param 是否倒放
 * @parent ---贴图---
 * @type boolean
 * @on 倒放
 * @off 不倒放
 * @desc true - 倒放，false - 不倒放
 * @default false
 * 
 * @param 平移-小箭头 X公式
 * @parent ---贴图---
 * @desc 以对话框的左上角为基准，x坐标的位置公式。ww表示对话框宽度，hh表示对话框高度。
 * @default ww*0.5
 * 
 * @param 平移-小箭头 Y公式
 * @parent ---贴图---
 * @desc 以对话框的左上角为基准，y坐标的位置公式。ww表示对话框宽度，hh表示对话框高度。
 * @default hh 
 * 
 * @param 透明度
 * @parent ---贴图---
 * @type number
 * @min 0
 * @max 255
 * @desc 0为完全透明，255为完全不透明。
 * @default 255
 *
 * @param 混合模式
 * @parent ---贴图---
 * @type select
 * @option 普通
 * @value 0
 * @option 发光
 * @value 1
 * @option 实色混合(正片叠底)
 * @value 2
 * @option 浅色
 * @value 3
 * @option 叠加
 * @value 4
 * @desc pixi的渲染混合模式。0-普通,1-发光。其他更详细相关介绍，去看看"0.基本定义 > 混合模式.docx"。
 * @default 0
 * 
 * @param ---效果---
 * @default 
 *
 * @param 旋转速度
 * @parent ---效果---
 * @desc 正数逆时针，负数顺时针，单位 角度/帧。(1秒60帧，360.0为一周) 
 * @default 0 
 *
 * @param 是否使用缩放效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 *
 * @param 缩放幅度
 * @parent 是否使用缩放效果
 * @desc 缩放的幅度，0.08表示图像大小的8%。
 * @default 0.08
 *
 * @param 缩放速度
 * @parent 是否使用缩放效果
 * @desc 缩放效果的速度。
 * @default 5.5
 *
 * @param 是否使用闪烁效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default false
 * 
 * @param 闪烁速度
 * @parent 是否使用闪烁效果
 * @desc 闪烁效果的速度。
 * @default 7.0
 *
 * @param 是否使用漂浮效果
 * @parent ---效果---
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc true - 使用，false - 不使用
 * @default true
 *
 * @param 漂浮方式
 * @parent 是否使用漂浮效果
 * @type select
 * @option 上下漂浮
 * @value 上下漂浮
 * @option 左右漂浮
 * @value 左右漂浮
 * @option 右下斜向漂浮
 * @value 右下斜向漂浮
 * @option 左下斜向漂浮
 * @value 左下斜向漂浮
 * @desc 漂浮的方式。
 * @default 上下漂浮
 *
 * @param 漂浮幅度
 * @parent 是否使用漂浮效果
 * @desc 上下漂浮的幅度，单位像素。
 * @default 6
 *
 * @param 漂浮速度
 * @parent 是否使用漂浮效果
 * @desc 漂浮效果的速度。
 * @default 12.5
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		DAr（DialogArrow）
//		临时全局变量	DrillUp.g_DAr_xxx
//		临时局部变量	无
//		存储数据变量	无
//		全局存储变量	无
//		覆盖重写方法	无
//
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	菜单管理层
//		★性能测试消耗	2.50ms（drill_DAr_updateGif）,11.42ms（drill_DAr_updateGif战斗界面、卡顿时）
//		★最坏情况		暂无
//		★备注			只有一个，所以消耗不可能上去。
//		
//		★优化记录		暂无
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★功能结构树：
//			对话框小箭头：
//				->对话框位置设置
//				->样式gif
//				->缩放效果/闪烁效果
//
//		★必要注意事项：
//			暂无
//			
//		★其它说明细节：
//			1.注意原箭头 _windowPauseSignSprite 和现箭头 _drill_DAr_sprite 的切换。
//			  根据样式自由切换。
//
//		★存在的问题：
//			暂无
//

//=============================================================================
// ** 提示信息
//=============================================================================
	//==============================
	// * 提示信息 - 参数
	//==============================
	var DrillUp = DrillUp || {}; 
	DrillUp.g_DAr_PluginTip_curName = "Drill_DialogArrow.js 对话框-对话框小箭头";
	DrillUp.g_DAr_PluginTip_baseList = [];
	
	
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_DialogArrow = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_DialogArrow');
	
	
	//==============================
	// * 变量获取 - 对话框小箭头
	//				（~struct~DrillDArSprite）
	//==============================
	DrillUp.drill_DAr_initArrowData = function( dataFrom ) {
		var data = {};
		if( dataFrom["资源-小箭头GIF"] != undefined &&
			dataFrom["资源-小箭头GIF"] != "" ){
			data['src_img'] = JSON.parse( dataFrom["资源-小箭头GIF"] || [] );
		}else{
			data['src_img'] = [];
		}
		data['src_img_file'] = "img/Menu__ui_message/";
		data['interval'] = Number( dataFrom["帧间隔"] || 4 );
		data['back_run'] = String( dataFrom["是否倒放"] || "false") === "true";
		data['x_formula'] = String( dataFrom["平移-小箭头 X公式"] || "" );
		data['y_formula'] = String( dataFrom["平移-小箭头 Y公式"] || "" );
		data['opacity'] = Number( dataFrom["透明度"] || 255 );
		data['blendMode'] = Number( dataFrom["混合模式"] || 0 );
		data['x'] = 0;
		data['y'] = 0;
		data['src_bitmaps'] = [];
		
		data['rotate'] = Number( dataFrom["旋转速度"] || 0 );
		data['zoom_enable'] = String( dataFrom["是否使用缩放效果"] || "false") === "true";
		data['zoom_range'] = Number( dataFrom["缩放幅度"] || 0.08 );
		data['zoom_speed'] = Number( dataFrom["缩放速度"] || 5.5 );
		data['flicker_enable'] = String( dataFrom["是否使用闪烁效果"] || "false") === "true";
		data['flicker_speed'] = Number( dataFrom["闪烁速度"] || 7.0 );
		data['float_enable'] = String( dataFrom["是否使用漂浮效果"] || "true") === "true";
		data['float_type'] = String( dataFrom["漂浮方式"] || "上下漂浮");
		data['float_range'] = Number( dataFrom["漂浮幅度"] || 6 );
		data['float_speed'] = Number( dataFrom["漂浮速度"] || 12.5 );
		
		return data;
	}
	
	/*-----------------杂项------------------*/
	DrillUp.g_DAr_visible = String(DrillUp.parameters['是否初始显示'] || 'true') === 'true';
	DrillUp.g_DAr_curStyle = Number(DrillUp.parameters['当前小箭头'] || 0);
	
	/*-----------------对话框小箭头------------------*/
	DrillUp.g_DAr_list_length = 10;
	DrillUp.g_DAr_list = [];
	for( var i = 0; i < DrillUp.g_DAr_list_length; i++ ){
		if( DrillUp.parameters['小箭头-' + String(i+1) ] != undefined &&
			DrillUp.parameters['小箭头-' + String(i+1) ] != "" ){
			var temp = JSON.parse(DrillUp.parameters['小箭头-' + String(i+1) ]);
			DrillUp.g_DAr_list[i] = DrillUp.drill_DAr_initArrowData( temp );
		}else{
			DrillUp.g_DAr_list[i] = null;
		}
	}
	
	

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_DAr_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_DAr_pluginCommand.call(this, command, args);
	
	if( command === ">对话框小箭头" ){
		if( args.length == 2 ){
			var type = String(args[1]);
			if( type == "显示" ){
				$gameSystem._drill_DAr_visible = true;
			}
			if( type == "隐藏" ){
				$gameSystem._drill_DAr_visible = false;
			}
			if( type == "恢复默认箭头" ){
				$gameSystem._drill_DAr_curStyle = 0;
			}
		}
		if( args.length == 4 ){
			var type = String(args[1]);
			var temp1 = String(args[3]);
			if( type == "切换样式" || type == "修改样式" ){
				temp1 = temp1.replace("样式[","");
				temp1 = temp1.replace("]","");
				$gameSystem._drill_DAr_curStyle = Number(temp1);
			}
		}
	};
};


//#############################################################################
// ** 【标准模块】存储数据
//#############################################################################
//##############################
// * 存储数据 - 参数存储 开关
//          
//			说明：	> 如果该插件开放了用户可以修改的参数，就注释掉。
//##############################
DrillUp.g_DAr_saveEnabled = true;
//##############################
// * 存储数据 - 初始化
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DAr_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _drill_DAr_sys_initialize.call(this);
	this.drill_DAr_initSysData();
};
//##############################
// * 存储数据 - 载入存档
//          
//			说明：	> 下方为固定写法，不要动。
//##############################
var _drill_DAr_sys_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_DAr_sys_extractSaveContents.call( this, contents );
	
	// > 参数存储 启用时（检查数据）
	if( DrillUp.g_DAr_saveEnabled == true ){	
		$gameSystem.drill_DAr_checkSysData();
		
	// > 参数存储 关闭时（直接覆盖）
	}else{
		$gameSystem.drill_DAr_initSysData();
	}
};
//##############################
// * 存储数据 - 初始化数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，执行数据初始化，并存入存档数据中。
//##############################
Game_System.prototype.drill_DAr_initSysData = function() {
	this.drill_DAr_initSysData_Private();
};
//##############################
// * 存储数据 - 载入存档时检查数据【标准函数】
//			
//			参数：	> 无
//			返回：	> 无
//          
//			说明：	> 强行规范的接口，载入存档时执行的数据检查操作。
//##############################
Game_System.prototype.drill_DAr_checkSysData = function() {
	this.drill_DAr_checkSysData_Private();
};
//=============================================================================
// ** 存储数据（接口实现）
//=============================================================================
//==============================
// * 存储数据 - 初始化数据（私有）
//==============================
Game_System.prototype.drill_DAr_initSysData_Private = function() {
	this._drill_DAr_visible = DrillUp.g_DAr_visible;			//显示状态
	this._drill_DAr_curStyle = DrillUp.g_DAr_curStyle;			//当前样式
};	
//==============================
// * 存储数据 - 载入存档时检查数据（私有）
//==============================
Game_System.prototype.drill_DAr_checkSysData_Private = function() {
	
	// > 旧存档数据自动补充
	if( this._drill_DAr_curStyle == undefined ){
		this.drill_DAr_initSysData();
	}
	
};


//=============================================================================
// ** 对话框
//=============================================================================
//==============================
// * 对话框 - 创建
//==============================
var _drill_DAr__createAllParts = Window_Message.prototype._createAllParts;
Window_Message.prototype._createAllParts = function() {
	_drill_DAr__createAllParts.call( this );
	
	this._drill_DAr_arrowSprite = new Drill_DAr_ArrowSprite();
	this.addChild( this._drill_DAr_arrowSprite );
};
//==============================
// * 对话框 - 等待输入
//==============================
var _drill_DAr_startPause = Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
    _drill_DAr_startPause.call( this );
	this._drill_DAr_arrowSprite.drill_DAr_setParentWindowSize( this._width, this._height );	//刷新父窗口数据
};
//==============================
// * 原箭头 - 刷新
//==============================
var _drill_DAr__refreshPauseSign = Window_Message.prototype._refreshPauseSign;
Window_Message.prototype._refreshPauseSign = function() {
	
	// > 原箭头刷新
	if( $gameSystem._drill_DAr_curStyle == 0 ){
		_drill_DAr__refreshPauseSign.call( this );
		
	// > 样式箭头刷新
	}else{
		//（不操作）
	}	
}
//==============================
// * 原箭头 - 帧刷新
//==============================
var _drill_DAr__updatePauseSign = Window_Message.prototype._updatePauseSign;
Window_Message.prototype._updatePauseSign = function() {
	
	// > 原箭头帧刷新
	if( $gameSystem._drill_DAr_curStyle == 0 ){
		_drill_DAr__updatePauseSign.call( this );
		
		this._drill_DAr_arrowSprite.visible = false;
		if( $gameSystem._drill_DAr_visible == false ){
			this._windowPauseSignSprite.visible = false;
		}
	
	// > 样式箭头帧刷新
	}else{
		var sprite = this._drill_DAr_arrowSprite;
		if( !this.pause ){			//（对应 Window.prototype._updatePauseSign 中方法）
			sprite.alpha = 0;
		}else if( sprite.alpha < 1 ){
			sprite.alpha = Math.min( sprite.alpha + 0.1, 1 );
		}
		sprite.visible = this.isOpen();
		
		this._windowPauseSignSprite.visible = false;
		if( $gameSystem._drill_DAr_visible == false ){
			this._drill_DAr_arrowSprite.visible = false;
		}
	}	
}


//=============================================================================
// ** 小箭头贴图
//
// 			代码：	> 范围 - 该类显示单独的小箭头装饰。
//					> 结构 - [ ●合并/分离/ 混乱 ] 数据与贴图合并。只visible和curStyle被外部控制。
//					> 数量 - [ ●单个 /多个] 
//					> 创建 - [ ●一次性 /自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 样式根据 _drill_curStyle 自变化_drill_data数据。
//=============================================================================
//==============================
// * 贴图 - 定义
//==============================
function Drill_DAr_ArrowSprite() {
	this.initialize.apply(this, arguments);
}
Drill_DAr_ArrowSprite.prototype = Object.create(Sprite.prototype);
Drill_DAr_ArrowSprite.prototype.constructor = Drill_DAr_ArrowSprite;
//==============================
// * 贴图 - 初始化
//==============================
Drill_DAr_ArrowSprite.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	// > 私有属性初始化
	this.anchor.x = 0.5;				//中心锚点
	this.anchor.y = 0.5;				//
	this._drill_time = 0;				//持续时间
	this._drill_data = null;			//样式数据
	this._drill_curStyle = -1;			//当前样式
	
	this._drill_x = 0;					//公式计算结果X
	this._drill_y = 0;					//公式计算结果Y
	
	// > 子贴图
	this._drill_DAr_sprite = null;		//指针贴图
};
//==============================
// * 贴图 - 帧刷新
//==============================
Drill_DAr_ArrowSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	this._drill_time += 1;
	
	if( this._drill_curStyle != $gameSystem._drill_DAr_curStyle ){	//重刷结构
		this._drill_curStyle = $gameSystem._drill_DAr_curStyle;
		this.drill_DAr_refreshAll();
	}
	if( this.visible == false ){ return; }			//未显示，不刷新
	if( this._drill_data == null ){ return; }		//未载入，不刷新
	
	this.drill_DAr_updatePosition();				//位置
	this.drill_DAr_updateGif();						//播放gif
	this.drill_DAr_updateEffects();					//效果控制
};
//==============================
// * 贴图 - 设置父窗口大小（接口）
//==============================
Drill_DAr_ArrowSprite.prototype.drill_DAr_setParentWindowSize = function( ww, hh ){
	if( this._drill_data == undefined ){ return; }
	var data = this._drill_data;
	
	this._drill_x = Number( eval( data['x_formula'] ) );
	this._drill_y = Number( eval( data['y_formula'] ) );
};

//==============================
// * 帧刷新 - 重刷结构
//==============================
Drill_DAr_ArrowSprite.prototype.drill_DAr_refreshAll = function() {
	
	// > 载入data
	var temp = DrillUp.g_DAr_list[ this._drill_curStyle - 1 ];
	if( temp == null ){ return; }
	this._drill_data = JSON.parse(JSON.stringify( temp ));
	
	// > 建立sprite
	var temp_sprite = new Sprite();
	var temp_sprite_data = this._drill_data;
	for(var j = 0; j < temp_sprite_data['src_img'].length ; j++){
		temp_sprite_data['src_bitmaps'].push( ImageManager.loadBitmap( temp_sprite_data['src_img_file'], temp_sprite_data['src_img'][j], 0, true ) );
	}
	temp_sprite.bitmap = temp_sprite_data['src_bitmaps'][0];
	temp_sprite.anchor.x = 0.5;
	temp_sprite.anchor.y = 0.5;
	temp_sprite.x = temp_sprite_data['x'];
	temp_sprite.y = temp_sprite_data['y'];
	temp_sprite.opacity = temp_sprite_data['opacity'];
	temp_sprite.blendMode = temp_sprite_data['blendMode'];
	
	// > 重添sprite
	if( this._drill_DAr_sprite ){this.removeChild( this._drill_DAr_sprite ); }
	this._drill_DAr_sprite = temp_sprite;
	this.addChild(temp_sprite);
}
//==============================
// * 帧刷新 - 位置
//==============================
Drill_DAr_ArrowSprite.prototype.drill_DAr_updatePosition = function() {
	var data = this._drill_data;
	
	this.x = this._drill_x;
	this.y = this._drill_y;
};
//==============================
// * 帧刷新 - 播放gif
//==============================
Drill_DAr_ArrowSprite.prototype.drill_DAr_updateGif = function() {
	if( this._drill_data == undefined ){ return; }
	if( this._drill_DAr_sprite == undefined ){ return; }
	
	var t_gif = this._drill_DAr_sprite;
	var t_gif_data = this._drill_data;
	
	// > 播放gif
	var inter = this._drill_time ;
	inter = inter / t_gif_data['interval'];
	inter = inter % t_gif_data['src_bitmaps'].length;
	if( t_gif_data['back_run'] ){
		inter = t_gif_data['src_bitmaps'].length - 1 - inter;
	}
	inter = Math.floor(inter);
	t_gif.bitmap = t_gif_data['src_bitmaps'][inter];
	
	// > 自旋转
	t_gif.rotation += t_gif_data['rotate'] /180*Math.PI;
	
}
//==============================
// * 帧刷新 - 效果控制
//==============================
Drill_DAr_ArrowSprite.prototype.drill_DAr_updateEffects = function() {
	if( this._drill_data == undefined ){ return; }
	if( this._drill_DAr_sprite == undefined ){ return; }
	var data = this._drill_data;
	
	// > 缩放效果
	if( data['zoom_enable'] == true ){
		var zoom_range = data['zoom_range'];
		var zoom_speed = data['zoom_speed'];
		var scale_value = 1 + zoom_range * Math.cos( this._drill_time*zoom_speed /180*Math.PI );
		this.scale.x = scale_value;
		this.scale.y = scale_value;
	}
	
	// > 闪烁效果
	if( data['flicker_enable'] == true ){
		var flicker_speed = data['flicker_speed'];
		this._drill_DAr_sprite.opacity = data['opacity']/2 + data['opacity']/2 * Math.cos( this._drill_time*flicker_speed /180*Math.PI );
	}
	
	// > 漂浮效果
	if( data['float_enable'] == true ){
		var float_range = data['float_range'];
		var float_speed = data['float_speed'];
		if( data['float_type'] == "上下漂浮" ){
			this._drill_DAr_sprite.y = data['y'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
		}
		if( data['float_type'] == "左右漂浮" ){
			this._drill_DAr_sprite.x = data['x'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
		}
		if( data['float_type'] == "右下斜向漂浮" ){
			this._drill_DAr_sprite.x = data['x'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
			this._drill_DAr_sprite.y = data['y'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
		}
		if( data['float_type'] == "左下斜向漂浮" ){
			this._drill_DAr_sprite.x = data['x'] - float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
			this._drill_DAr_sprite.y = data['y'] + float_range * Math.sin( this._drill_time*float_speed /180*Math.PI );
		}
	}
}

