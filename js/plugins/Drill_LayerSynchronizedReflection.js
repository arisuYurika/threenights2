//=============================================================================
// Drill_LayerSynchronizedReflection.js
//=============================================================================

/*:
 * @plugindesc [v2.1]        行走图 - 图块同步镜像
 * @author Drill_up
 * 
 * @Drill_LE_param "地图镜面-%d"
 * @Drill_LE_parentKey "---地图镜面组%d至%d---"
 * @Drill_LE_var "DrillUp.g_LSR_mirror_length"
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_LayerSynchronizedReflection +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 使得你可以让图块反射出与基准线垂直的镜像。
 * ★★尽量放在所有 行走图效果 的插件后面，放后面可以支持更多叠加效果★★ 
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 该插件可以单独使用。
 * 
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面。
 *   事件、玩家、跟随队员都有效。
 * 2.注意区分 镜面 和 镜像 关系。
 *   建议先了解 "0.基本定义 > 显示与透明度.docx"。
 *   更多详细内容，去看看 "7.行走图 > 关于镜像与镜面.docx"。
 * 地图开关：
 *   (1.不反射镜像指令 或者 没有在镜面上 都只是镜像不显示，并不是不存在。
 *      如果你要完全关闭镜像，需要添加地图备注来禁用整张地图的镜像。
 * 镜面：
 *   (1.你可以直接设置 地形标志 或者 区域标记 的图块变成镜面。
 *      没有设置的图块将不为镜面，会遮挡事件镜像。
 *      注意，每个图块都是48x48的正方体镜面，若要处理复杂情况，见文档。
 *   (2.反射遇到循环地图的边缘时，会出现镜像关闭的现象。
 *      这是由于镜面无法在地图边缘同时出现两个。
 * 同步镜像：
 *   (1.同步镜像能支持大部分动作效果，包括跳跃、透明度、多帧行走图。
 *   (2.所有事件都默认开启镜像，并且开启透明同步。
 *      通过事件复制器生成的新事件也支持镜像。
 *   (3.同步镜像不支持滤镜、粉碎效果。
 *   (4.该插件可以与 倒影镜像 插件同时使用，但是只有同步和倒影两个镜像。
 *      而现实生活中，两面垂直的镜子会反射出三个镜像。
 * 镜像边：
 *   (1.同步镜像是根据反射的基准线，同步反射出来镜像。
 *      相当于墙壁上的大镜子的垂直镜像。而不是倒影。
 *   (2.你朝向上（面向镜面）时，镜像是朝向下的。你可以设置注释锁定镜像的朝向。
 *      也可以不锁定，镜面反射的物体不一致也可以成为一种玩法。
 * 毛玻璃效果：
 *   (1.毛玻璃本质上是在镜像的基础上额外添加一层模糊滤镜。
 *      你可以通过 地图备注 或 插件指令 控制开关毛玻璃效果。
 *   (2.注意，毛玻璃效果会额外造成一定的性能消耗，
 *      如果开了镜像的地图已经很卡了，建议关闭毛玻璃效果，减少系统计算负担。
 * 透明同步：
 *   (1.默认的镜像与事件的透明度是保持一致的，所以称为"透明同步"。
 *   (2.你可以关闭 透明同步，使得 事件自己不可见，但是能反射出镜像。
 *      以此看起来像是在镜子中一样。
 * 设计：
 *   (1.你可以直接画一张大的镜面图，用于特殊的解谜，将密码写在镜面上。
 *   (2.你可以像镜像管理层那样画一个大镜子，镜子的反射可以不一致。
 *      镜子里的敌人向你的镜像发动攻击命中后，你会受到实质的伤害。
 *
 * -----------------------------------------------------------------------------
 * ----激活条件 - 地图开关
 * 你可以在地图备注中设置镜像的开关与关闭，在地图中添加：
 * （注意，地图备注的冒号没有空格，插件指令的冒号两边有空格）
 * 
 * 地图备注：=>图块同步镜像:启用
 * 地图备注：=>图块同步镜像:禁用
 * 
 * 地图备注：=>图块同步镜像:同步镜像边:288
 * 地图备注：=>图块同步镜像:同步镜像边(图块单位):6
 * 插件指令：>图块同步镜像 : 设置同步镜像边 : 288
 * 插件指令：>图块同步镜像 : 设置同步镜像边(图块单位) : 6
 * 插件指令：>图块同步镜像 : 设置同步镜像模式 : 等距同步
 * 插件指令：>图块同步镜像 : 设置同步镜像模式 : 单行同步
 * 
 * 1.同步镜像启用后，必须设置 同步镜像边 作为反射的基准。
 *   你可以根据地图镜子的 Y轴像素距离 或 图块距离 来 同步镜像边。
 * 2.如果地图中的事件过多（300以上），镜像造成的性能消耗可能会非常大，
 *   所以建议在设计镜像时，最好考虑一些整张地图大小和事件数量。
 * 3.同步镜像有两种模式： 单行同步 和 等距同步。
 *   具体效果可以去看看文档说明。
 * 
 * -----------------------------------------------------------------------------
 * ----激活条件 - 镜面
 * 你可以将整个地图变成一个大镜面，使用下面的地图备注。
 * （注意，冒号没有空格）
 * 
 * 地图备注：=>图块同步镜面:镜面[1]
 * 地图备注：=>图块同步镜面:资源文件名
 * 
 * 1.地图备注中设置镜面，可将整个地图变成一个大镜面。
 *   可以直接写资源文件名，也可以写 配置的镜面id 编号。
 * 2.地图镜面的资源需要和地图的大小一模一样。为( 图块长x48,图块宽x48 )像素。
 *   具体镜面的配置方法，可以去看看文档介绍。
 * 
 * -----------------------------------------------------------------------------
 * ----关联文件 - 镜面
 * 资源路径：img/Map__reflection （Map后面有两个下划线）
 * 先确保项目img文件夹下是否有Map__reflection文件夹！
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。这里需要手动配置：
 * 
 * 地图镜面-1
 * 地图镜面-2
 * ……
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 镜像开关
 * 你可以通过下列方法控制镜像的开启与关闭。
 * 
 * 事件备注：<不反射镜像>
 *
 * 事件注释：=>图块同步镜像 : 不反射镜像
 * 事件注释：=>图块同步镜像 : 开启反射镜像
 * 
 * 插件指令：>图块同步镜像 : 玩家 : 不反射镜像
 * 插件指令：>图块同步镜像 : 本事件 : 不反射镜像
 * 插件指令：>图块同步镜像 : 事件[10] : 不反射镜像
 * 插件指令：>图块同步镜像 : 事件变量[10] : 不反射镜像
 * 插件指令：>图块同步镜像 : 批量事件[10,11] : 不反射镜像
 * 插件指令：>图块同步镜像 : 批量事件变量[21,22] : 不反射镜像
 * 
 * 插件指令：>图块同步镜像 : 本事件 : 不反射镜像
 * 插件指令：>图块同步镜像 : 本事件 : 开启反射镜像
 *
 * 1.所有镜像默认开启反射。
 * 2.事件注释的 不反射镜像和开启反射镜像 可以针对不同的事件页进行设置。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 毛玻璃效果
 * 你可以给镜面直接整体添加额外的毛玻璃效果。
 * 
 * 地图备注：=>图块同步镜像:毛玻璃效果:启用
 * 地图备注：=>图块同步镜像:毛玻璃效果:禁用
 * 插件指令：>图块同步镜像 : 毛玻璃效果 : 启用
 * 插件指令：>图块同步镜像 : 毛玻璃效果 : 禁用
 * 
 * 1.注意，毛玻璃效果会额外造成一定的性能消耗，
 *   如果开了镜像的地图已经很卡了，建议关闭毛玻璃效果，减少系统计算负担。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 行走图锁定
 * 你可以设置在事件注释中锁定镜像的行走图朝向：
 *
 * 事件注释：=>图块同步镜像 : 锁定镜像朝向
 * 事件注释：=>图块同步镜像 : 关闭锁定镜像朝向
 * 
 * 1.如果事件是一个 静态物件 ，朝向上或下时，镜像的行走图是不一致的。
 *   通过锁定朝向，可以使物体的镜像反射一致。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 透明同步
 * 你可以关闭镜像的透明度与事件的统一同步的设置：
 * 
 * 事件注释：=>图块同步镜像 : 关闭镜像透明同步
 * 事件注释：=>图块同步镜像 : 开启镜像透明同步
 * 
 * 插件指令：>图块同步镜像 : 玩家 : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 本事件 : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 事件[10] : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 事件变量[10] : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 批量事件[10,11] : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 批量事件变量[21,22] : 关闭镜像透明同步
 * 
 * 插件指令：>图块同步镜像 : 本事件 : 关闭镜像透明同步
 * 插件指令：>图块同步镜像 : 本事件 : 开启镜像透明同步
 *
 * 1."透明同步"是指：
 *    镜像透明度 与 事件透明度 保持一致。
 *    镜像透明状态 与 事件透明状态 保持一致。
 * 2.你可以关闭 透明同步，设置事件 透明度为0 或 开启透明状态，
 *   这样事件自己不可见，但是能反射出镜像。（镜中小爱丽丝）
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
 * 测试方法：   开启地图的同步镜像开关，设置图块。
 *              去物体管理层、地理管理层、镜像管理层跑一圈测试就可以了。
 * 测试结果：   200个事件的地图中，平均消耗为：【107.95ms】
 *              100个事件的地图中，平均消耗为：【74.94ms】
 *               50个事件的地图中，平均消耗为：【52.21ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.考虑到性能优化，如果镜像离开了镜头，那么可以直接关闭镜像，减少
 *   消耗量。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修改了插件分类。并且修复了角色隐身时，镜像不隐身的bug。
 * [v1.2]
 * 优化了内部结构，并且添加了性能测试说明。
 * [v1.3]
 * 修改了插件关联的资源文件夹。
 * [v1.4]
 * 添加了 镜像离开镜头是否自动关闭 的性能优化功能。
 * [v1.5]
 * 修复了镜像图像在的事件图像上面的bug。
 * [v1.6]
 * 修改了插件指令格式，修改了透明状态控制。
 * [v1.7]
 * 添加了最大值编辑的支持。
 * [v1.8]
 * 优化了内部结构，添加了偏移补正支持。
 * [v1.9]
 * 修正了镜像公式，使得同步镜像在竖直循环地图中仍然能正常使用。
 * [v2.0]
 * 修正了镜面里的 同步镜像物体 遮挡关系。
 * 修正了地图备注，以及添加了 毛玻璃效果 。
 * [v2.1]
 * 兼容了 事件彻底删除时，也包括删除镜像的功能。
 * 
 * 
 *
 * @param 所有地图是否默认启用镜像
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 地图默认启用/禁用的设置。你可以添加地图备注额外修改不同地图中的启用情况。
 * @default false
 *
 * @param 所有地图是否默认启用毛玻璃效果
 * @type boolean
 * @on 启用
 * @off 禁用
 * @desc 地图默认启用/禁用的设置。你可以添加地图备注额外修改不同地图中的启用情况。
 * @default false
 *
 * @param 毛玻璃模糊程度
 * @parent 所有地图是否默认启用毛玻璃效果
 * @type number
 * @min 1
 * @max 8
 * @desc 毛玻璃的模糊程度，程度范围为 1~8 。
 * @default 4
 *
 * @param 初始同步镜像边
 * @type number
 * @min 0
 * @desc 反射出同步镜像的反射边缘Y轴位置，单位像素。（一个图块为48像素）
 * @default 288
 *
 * @param 反射模式
 * @type select
 * @option 等距同步
 * @value 等距同步
 * @option 单行同步
 * @value 单行同步
 * @desc 等距同步：根据事件与反射边的距离，反射镜像。单行同步：无视距离，所有镜像都被挤在一行反射边中。
 * @default 等距同步
 *
 * @param 图块标记
 * @desc 指定标记数字的图块将会具有反射效果，可以设置多个。（1-7）
 * @type number[]
 * @min 1
 * @max 7
 * @default []
 *
 * @param 区域标记
 * @desc 指定标记的R区域将会具有反射效果，可以设置多个。（1-255）
 * @type number[]
 * @min 1
 * @max 255
 * @default ["12"]
 *
 * @param 镜像透明比例
 * @type number
 * @min 0
 * @max 100
 * @desc 镜像的透明度百分比的比例，0表示完全透明，100表示完全不透明。能与动作效果叠加。
 * @default 55
 *
 * @param 镜像离开镜头是否自动关闭
 * @type boolean
 * @on 自动关闭
 * @off 禁用
 * @desc 考虑到性能优化，如果镜像离开了镜头，可以直接关闭镜像。
 * @default true
 * 
 * 
 * @param ---地图镜面组 1至20---
 * @default 
 *
 * @param 地图镜面-1
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-2
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-3
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-4
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-5
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-6
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-7
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-8
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-9
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-10
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-11
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-12
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-13
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-14
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-15
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-16
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-17
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-18
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-19
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-20
 * @parent ---地图镜面组 1至20---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param ---地图镜面组21至40---
 * @default 
 *
 * @param 地图镜面-21
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-22
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-23
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-24
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-25
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-26
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-27
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-28
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-29
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-30
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-31
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-32
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-33
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-34
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-35
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-36
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-37
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-38
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-39
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-40
 * @parent ---地图镜面组21至40---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param ---地图镜面组41至60---
 * @default 
 *
 * @param 地图镜面-41
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-42
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-43
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-44
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-45
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-46
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-47
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-48
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-49
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-50
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-51
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-52
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-53
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-54
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-55
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-56
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-57
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-58
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-59
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 *
 * @param 地图镜面-60
 * @parent ---地图镜面组41至60---
 * @desc 自定义的镜像图片资源，作用于整张地图的镜面。
 * @default 
 * @require 1
 * @dir img/Map__reflection/
 * @type file
 * 
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称		LSR（Layer_Synchronized_Reflection）
//		临时全局变量	DrillUp.g_LSR_xxx
//		临时局部变量	无
//		存储数据变量	this._drill_LSR_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//	
//<<<<<<<<性能记录<<<<<<<<
//
//		★工作类型		持续执行
//		★时间复杂度		o(n)*o(贴图处理) 每帧
//		★性能测试因素	镜像管理层50事件 跑一圈
//		★性能测试消耗	低谷期：30.90ms（不优化） 18.70ms（离开镜头优化）
//						（未出现高峰期）
//		★最坏情况		只要镜像多，就是最坏情况。
//		★备注			贴图处理减少的消耗，不是很好测，但是也有值。
//						在200事件的地图中，可以直接减少70%的消耗。
//						因为出了镜头的镜像暂停刷新，缩小了范围，200事件就变成了50个事件的消耗。
//		
//		★优化记录
//			2021-11-4优化
//				14.70ms（Drill_Sprite_LSR.prototype.drill_LSR_isNearTheScreen函数）
//				10.05ms（Drill_Sprite_LSR.prototype.update函数）
//
//<<<<<<<<插件记录<<<<<<<<
//
//		★大体框架与功能如下：
//			图块同步镜像：
//				->镜面
//					->地图图块遮罩
//					->镜面对称线
//					->毛玻璃效果
//				->镜像
//					->显示隐藏
//					->镜像载入
//					->镜像跳跃、动作效果（继承）
//					->透明同步
//					->先后遮挡顺序
//				->优化
//					->镜头外的镜像隐藏
//					x->镜像滤镜（消耗太大）
//					x->镜像粉碎（需要额外控制作用）
// 
//		★私有类如下：
//			* Drill_Sprite_LSR【地图图块遮罩】
//			* Drill_Sprite_LSR_Mask【地图图块遮罩】
//
//		★必要注意事项：
//			1.部分插件必须手动屏蔽镜像，最好添加一个函数用于区分镜像情况：
//				//==============================
//				// * 优化 - 检查镜像情况
//				//==============================
//				Game_Temp.prototype.drill_XXX_isReflectionSprite = function( sprite ){
//					if( Imported.Drill_LayerReverseReflection      && sprite instanceof Drill_Sprite_LRR ){ return true; }
//					if( Imported.Drill_LayerSynchronizedReflection && sprite instanceof Drill_Sprite_LSR ){ return true; }
//					return false;
//				}
//			2.由于透明度绘制的反射关系，这里使用了 颜色矩阵滤镜 来控制透明度。
//			  （不能直接改父贴图的透明度，子类透明后不会实现遮挡关系）
//
//		★其它说明细节：
//			1.反射原理并不难，每个事件都附带一个一模一样的镜像，根据对称线同步动作即可。
//			2.建立了一个层 this._drill_LSR_layer 存放所有镜像，在地形贴图的上面，角色图层的下面。
//			3,注意，事件的_transparent是与visible不一样的特殊控制变量。
//
//		★存在的问题：
//			1.定义一个镜像后，事件的 动画贴图和气泡贴图 会被镜面遮挡。（已解决）
//			2.进入循环地图边缘后，由于遮罩不是循环的，刷新位置后会出现镜像消失问题。（已解决）
//		
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_LayerSynchronizedReflection = true;
　　var DrillUp = DrillUp || {}; 
    DrillUp.parameters = PluginManager.parameters('Drill_LayerSynchronizedReflection');
	
	
	/*-----------------杂项------------------*/
	DrillUp.g_LSR_map_default = String(DrillUp.parameters['所有地图是否默认启用镜像'] || "false") === "true";	
	DrillUp.g_LSR_map_blurDefault = String(DrillUp.parameters['所有地图是否默认启用毛玻璃效果'] || "false") === "true";	
    DrillUp.g_LSR_blurValue = Number(DrillUp.parameters['毛玻璃模糊程度'] || 4);
    DrillUp.g_LSR_edge = Number(DrillUp.parameters['初始同步镜像边'] || 288);
	DrillUp.g_LSR_mode = String(DrillUp.parameters['反射模式'] || "等距同步");	
    DrillUp.g_LSR_opacity_per = Number(DrillUp.parameters['镜像透明比例'] || 55);
	DrillUp.g_LSR_auto_close = String(DrillUp.parameters['镜像离开镜头是否自动关闭'] || "true") === "true";	
	DrillUp.g_LSR_reflectionMap = "";		//（当前镜面资源，备注中设置）
	/*-----------------标记------------------*/
	if( DrillUp.parameters['图块标记'] != "" &&
		DrillUp.parameters['图块标记'] != undefined ){
		DrillUp.g_LSR_terrainIds = (JSON.parse( DrillUp.parameters['图块标记'])).map(function(n){ return Number(n) });;
	}else{
		DrillUp.g_LSR_terrainIds = ([]).map(function(n){ return Number(n) }); ;
	}
	if( DrillUp.parameters['区域标记'] != "" &&
		DrillUp.parameters['区域标记'] != undefined ){
		DrillUp.g_LSR_areaIds = (JSON.parse( DrillUp.parameters['区域标记'])).map(function(n){ return Number(n) });;
	}else{
		DrillUp.g_LSR_areaIds = ([]).map(function(n){ return Number(n) }); ;
	}
	
	/*-----------------镜面------------------*/
	DrillUp.g_LSR_mirror_length = 60;
	DrillUp.g_LSR_mirror = [];	
	for( var i = 0; i < DrillUp.g_LSR_mirror_length; i++ ){
		DrillUp.g_LSR_mirror[i] = String( DrillUp.parameters['地图镜面-'+String(i+1)] ) || "";
	}
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_MapReflection = function(filename) {
    return this.loadBitmap('img/Map__reflection/', filename, 0, true);
};

//=============================================================================
// ** 插件指令
//=============================================================================
var _Drill_LSR_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_Drill_LSR_pluginCommand.call(this, command, args);
	if( command === ">图块同步镜像" ){ //>图块同步镜像 : 玩家 : 不反射镜像
	
		/*-----------------同步镜像边------------------*/
		if( args.length == 4 ){
			var temp1 = String(args[1]);
			var temp2 = String(args[3]);
			
			if( temp1 == "设置同步镜像边" ){ 
				$gameSystem._drill_LSR_tileEdge = Number(temp2) / $gameMap.tileHeight();
				return;
			}
			if( temp1 == "设置同步镜像边(图块单位)" ){ 
				$gameSystem._drill_LSR_tileEdge = Number(temp2);
				return;
			}
			if( temp1 == "设置同步镜像模式" ){ 
				$gameSystem._drill_LSR_mode = String(temp2);
				return;
			}
			if( temp1 == "毛玻璃效果" ){ 
				if( temp2 == "启用" || temp2 === "开启" ){
					$gameMap._drill_LSR_blurEnable = true;
				}
				if( temp2 == "禁用" || temp2 === "关闭" ){
					$gameMap._drill_LSR_blurEnable = false;
				}
				return;
			}
		}
			
		/*-----------------对象组获取------------------*/
		var chars = null;			// 玩家对象组
		if( args.length >= 2 ){
			var unit = String(args[1]);
			if( chars == null && unit == "本事件" ){
				var e = $gameMap.event( this._eventId );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("批量事件[") != -1 ){
				unit = unit.replace("批量事件[","");
				unit = unit.replace("]","");
				chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = Number(temp_arr[k]);
					if( $gameMap.drill_LSR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					chars.push( e );
				}
			}
			if( chars == null && unit.indexOf("批量事件变量[") != -1 ){
				unit = unit.replace("批量事件变量[","");
				unit = unit.replace("]","");
				chars = [];
				var temp_arr = unit.split(/[,，]/);
				for( var k=0; k < temp_arr.length; k++ ){
					var e_id = $gameVariables.value(Number(temp_arr[k]));
					if( $gameMap.drill_LSR_isEventExist( e_id ) == false ){ continue; }
					var e = $gameMap.event( e_id );
					chars.push( e );
				}
			}
			if( chars == null && unit.indexOf("事件变量[") != -1 ){
				unit = unit.replace("事件变量[","");
				unit = unit.replace("]","");
				var e_id = $gameVariables.value(Number(unit));
				if( $gameMap.drill_LSR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			if( chars == null && unit.indexOf("事件[") != -1 ){
				unit = unit.replace("事件[","");
				unit = unit.replace("]","");
				var e_id = Number(unit);
				if( $gameMap.drill_LSR_isEventExist( e_id ) == false ){ return; }
				var e = $gameMap.event( e_id );
				chars = [ e ];
			}
			if( chars == null && unit == "玩家" ){
				chars = [ $gamePlayer ];
				var f_char = $gamePlayer.followers().visibleFollowers();
				for( var i=0; i < f_char.length; i++ ){
					chars.push( f_char[i] );
				}
			}
		}
		
		/*-----------------镜像设置------------------*/
		if( chars != null ){
			var type = String(args[3]);
			if( type == "不反射镜像" ){
				for( var i=0; i < chars.length; i++ ){
					chars[i]._drill_LSR_isReflect = false;
				}
			}
			if( type == "开启反射镜像" ){
				for( var i=0; i < chars.length; i++ ){
					chars[i]._drill_LSR_isReflect = true;
				}
			}
			if( type == "关闭镜像透明同步" ){
				for( var i=0; i < chars.length; i++ ){
					chars[i]._drill_LSR_isOpacitySync = false;
				}
			}
			if( type == "开启镜像透明同步" ){
				for( var i=0; i < chars.length; i++ ){
					chars[i]._drill_LSR_isOpacitySync = true;
				}
			}
		}
	}
};
//==============================
// ** 插件指令 - 事件检查
//==============================
Game_Map.prototype.drill_LSR_isEventExist = function( e_id ){
	if( e_id == 0 ){ return false; }
	
	var e = this.event( e_id );
	if( e == undefined ){
		alert( "【Drill_LayerSynchronizedReflection.js 行走图 - 图块同步镜像】\n" +
				"插件指令错误，当前地图并不存在id为"+e_id+"的事件。");
		return false;
	}
	return true;
};


//=============================================================================
// ** 存储变量初始化
//=============================================================================
var _drill_LSR_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_LSR_sys_initialize.call(this);
    this._drill_LSR_tileEdge = DrillUp.g_LSR_edge ;		//同步镜像边
    this._drill_LSR_mode = DrillUp.g_LSR_mode ;			//同步镜像模式
};


//=============================================================================
// ** 事件
//=============================================================================
//==============================
// * 事件 - 注释设置
//==============================
var _drill_LSR_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	_drill_LSR_setupPage.call(this);
    this.drill_LSR_setupReflect();
};
Game_Event.prototype.drill_LSR_setupReflect = function() {
	
	// > 事件备注
	var meta_data = this.event().meta;
	if( meta_data != undefined ){
		if( meta_data['不反射镜像'] == true ){
			this._drill_LSR_isReflect = false;
		}
	}
	
	// > 事件注释
	if (!this._erased && this.page()) {this.list().forEach(function(l) {
		if (l.code === 108) {
			var args = l.parameters[0].split(' ');
			var command = args.shift();
			if (command == "=>图块同步镜像"){	//=>图块同步镜像 : 不反射镜像
				if(args.length == 2){
					if(args[1]){ var type = String(args[1]); }
					if( type == "不反射镜像" ){
						this._drill_LSR_isReflect = false;
					}
					if( type == "开启反射镜像" ){
						this._drill_LSR_isReflect = true;
					}
					if( type == "关闭镜像透明同步" ){
						this._drill_LSR_isOpacitySync = false;
					}
					if( type == "开启镜像透明同步" ){
						this._drill_LSR_isOpacitySync = true;
					}
					if( type == "锁定镜像朝向" ){
						this._drill_LSR_isLockDir = true;
					}
					if( type == "关闭锁定镜像朝向" ){
						this._drill_LSR_isLockDir = false;
					}
				}
			};
		};
	}, this);};
};

//=============================================================================
// ** 地图备注
//=============================================================================
var _drill_LSR_map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	_drill_LSR_map_setup.call(this, mapId);
	this.drill_LSR_setupReflection();
};
Game_Map.prototype.drill_LSR_setupReflection = function() {
	
	// > 启用标记 初始化
	this._drill_LSR_enable = DrillUp.g_LSR_map_default;
	this._drill_LSR_blurEnable = DrillUp.g_LSR_map_blurDefault;
	
	// > 镜面 初始化
	DrillUp.g_LSR_reflectionMap = "";
	
	$dataMap.note.split(/[\r\n]+/).forEach(function(note) {
		var text_ = note.split(':');
		if( text_[0] === "=>图块同步镜像" ){
			if( text_.length == 2 ){
				var temp1 = String(text_[1]);
				if( temp1 === "启用" || temp1 === "开启" ){
					this._drill_LSR_enable = true;
				}
				if( temp1 === "禁用" || temp1 === "关闭" ){
					this._drill_LSR_enable = false;
				}
			}
			if( text_.length == 3 ){
				var temp1 = String(text_[1]);
				var temp2 = String(text_[2]);
				if( temp1 === "同步镜像边" ){
					$gameSystem._drill_LSR_tileEdge = Number(temp2 || 0) / this.tileHeight();
				}
				if( temp1 === "同步镜像边(图块单位)" ){
					$gameSystem._drill_LSR_tileEdge = Number(temp2 || 0);
				}
				if( temp1 === "毛玻璃效果" ){
					if( temp1 === "启用" || temp1 === "开启" ){
						this._drill_LSR_blurEnable = true;
					}
					if( temp1 === "禁用" || temp1 === "关闭" ){
						this._drill_LSR_blurEnable = false;
					}
				}
			}
		}
		if( text_[0] === "=>图块同步镜面" ){
			if( text_.length == 2 ){
				var temp1 = String(text_[1]);
				if( temp1.indexOf("镜面[") != -1 ){
					temp1 = temp1.replace("镜面[","");
					temp1 = temp1.replace("]","");
					DrillUp.g_LSR_reflectionMap = DrillUp.g_LSR_mirror[ Number(temp1)-1 ];
				}else{
					DrillUp.g_LSR_reflectionMap = text_[1] || "";
				}
			}
		}
		
		/*-----------------旧备注------------------*/
		if( text_[0] === "=>启用图块同步镜像"){
			this._drill_LSR_enable = true;
		}
		if( text_[0] === "=>禁用图块同步镜像"){
			this._drill_LSR_enable = false;
		}
		if( text_[0] === "=>设置同步镜像边"){
			$gameSystem._drill_LSR_tileEdge = Number(text_[1] || 0) / this.tileHeight();
		}
		if( text_[0] === "=>设置同步镜像边(图块单位)"){
			$gameSystem._drill_LSR_tileEdge = Number(text_[1] || 0);
		}
	},this);
};


//=============================================================================
// ** 物体
//=============================================================================
//==============================
// * 物体初始化
//==============================
var _drill_LSR_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _drill_LSR_initMembers.call(this);
	this._drill_LSR_isReflect = true;		//反射标记
	this._drill_LSR_isOpacitySync = true;	//镜像同步标记
	this._drill_LSR_isLockDir = false;		//锁定镜像朝向标记
};
//==============================
// * 获取 - 是否反射
//==============================
Game_CharacterBase.prototype.drill_LSR_isReflect = function() {
	return this._drill_LSR_isReflect;
};
//==============================
// * 获取 - 是否镜像同步
//==============================
Game_CharacterBase.prototype.drill_LSR_isOpacitySync = function() {
	return this._drill_LSR_isOpacitySync;
};
//==============================
// * 获取 - 是否锁定镜像朝向
//==============================
Game_CharacterBase.prototype.drill_LSR_isLockDir = function() {
	return this._drill_LSR_isLockDir;
};
//==============================
// * 物体 - 偏移补正值X（继承接口）
//
//			说明：	此函数用于 镜像、黑影 的位置偏移补正值。可被其他插件继承累加。
//==============================
var _drill_LSR_reverseOffsetX = Game_CharacterBase.prototype.drill_reverseOffsetX;
Game_CharacterBase.prototype.drill_reverseOffsetX = function(){
	var xx = 0;
	if( _drill_LSR_reverseOffsetX != undefined ){		//（函数继承捕获，如果此插件放在 倒影插件 前面，则创建该函数，否则直接继承）
		xx = _drill_LSR_reverseOffsetX.call( this );
	}
	return xx;
}
//==============================
// * 物体 - 偏移补正值Y（继承接口）
//
//			说明：	此函数用于 镜像、黑影 的位置偏移补正值。可被其他插件继承累加。
//==============================
var _drill_LSR_reverseOffsetY = Game_CharacterBase.prototype.drill_reverseOffsetY;
Game_CharacterBase.prototype.drill_reverseOffsetY = function(){
	var yy = 0;
	if( _drill_LSR_reverseOffsetY != undefined ){
		yy = _drill_LSR_reverseOffsetY.call( this );
	}
	return yy;
}

//==============================
// * 事件贴图 - 固定帧初始值
//==============================
var _Drill_LSR_s_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
	_Drill_LSR_s_updatePosition.call(this);
	if( this.scale.x != 1 ){ this.scale.x = 1; }
	if( this.scale.y != 1 ){ this.scale.y = 1; }
	//if( this.rotation != 0 ){ this.rotation = 0; }
	//if( this.skew.x != 0 ){ this.skew.x = 0; }
	//if( this.skew.y != 0 ){ this.skew.y = 0; }
	//从这里开始，参数都被固定值（不需要考虑多次update的叠加影响）
};

//=============================================================================
// ** 地图图层
//=============================================================================
//==============================
// * 地图图层 - 创建
//==============================
var _drill_LSR_createTilemap = Spriteset_Map.prototype.createTilemap;
Spriteset_Map.prototype.createTilemap = function() {
	_drill_LSR_createTilemap.call(this);
	this.drill_LSR_createReflect();
};
//==============================
// * 创建 - 建立镜像（Tilemap层）
//==============================
Spriteset_Map.prototype.drill_LSR_createReflect = function() {
	if($gameMap._drill_LSR_enable != true){ return; }
	
	// > 建立贴图
	this._drill_LSR_sprites = [];
	$gameMap.events().forEach(function(event) {					//事件
		this._drill_LSR_sprites.push(new Drill_Sprite_LSR(event));
	}, this);
	$gamePlayer.followers().reverseEach(function(follower) {	//跟随队员
		this._drill_LSR_sprites.push(new Drill_Sprite_LSR(follower));
	}, this);
	this._drill_LSR_sprites.push(new Drill_Sprite_LSR($gamePlayer));	//玩家
	
	// > 建立遮罩（将反射的图块全部涂白）
	this._drill_LSR_layer = new Sprite();
	this._drill_LSR_layer_mask = new Drill_Sprite_LSR_Mask();
	for (var i = 0; i < this._drill_LSR_sprites.length; i++) {
		this._drill_LSR_layer.addChild(this._drill_LSR_sprites[i]);
	}
	this._drill_LSR_layer.addChild(this._drill_LSR_layer_mask);		//遮罩原型（如果不addchild，Sprite是不会update的）
	this._drill_LSR_layer.mask = this._drill_LSR_layer_mask;		//遮罩
	this._drill_LSR_layer.z = 0.55;									//_tilemap z轴：1.事件下方 3.事件相同 5.事件上方 6.影子 7.气泡 8.动画层 9.鼠标目的地
																	//_tilemap再下面就是父类图块自身了，再下面是Parallax
	
	// > 颜色矩阵滤镜（控制绘制透明度）
	var cf_opacity = DrillUp.g_LSR_opacity_per * 0.01;		//（整体透明度）
	var cf = new PIXI.filters.ColorMatrixFilter();
	var matrix = [1,   0,   0,   0,   0, 
				  0,   1,   0,   0,   0, 
				  0,   0,   1,   0,   0, 
				  0,   0,   0,   cf_opacity,  0 ];
	cf._loadMatrix(matrix, true);
	this._drill_LSR_cf = cf;
	
	// > 初始滤镜
	this._drill_LSR_layer.filters = [cf];
	this._drill_LSR_blurAdded = false;
	
	this._tilemap.addChild(this._drill_LSR_layer);
};
//==============================
// * 地图图层 - 确认物体数量
//==============================
var _drill_LSR_createCharacters = Spriteset_Map.prototype.createCharacters;
Spriteset_Map.prototype.createCharacters = function() {
	_drill_LSR_createCharacters.call(this);
	this._drill_LSR_CharSpriteLen = this._characterSprites.length;	//>记录物体数量
};
//==============================
// * 地图图层 - 帧刷新
//==============================
var _drill_LSR_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
	_drill_LSR_update.call(this);
	this.drill_LSR_updateNewEventReflect();		//帧刷新 - 新事件的镜像
	this.drill_LSR_updateChildSort();			//帧刷新 - 子贴图排序
	this.drill_LSR_updateBlurFilter();			//帧刷新 - 毛玻璃效果控制
}
//==============================
// * 帧刷新 - 新事件的镜像
//==============================
Spriteset_Map.prototype.drill_LSR_updateNewEventReflect = function() {
	if( $gameMap._drill_LSR_enable != true ){ return; }
	
	if( this._characterSprites.length > this._drill_LSR_CharSpriteLen ){
		for(var i = this._drill_LSR_CharSpriteLen; i<this._characterSprites.length; i++ ){
			var temp_sprite = new Drill_Sprite_LSR(this._characterSprites[i]._character);
			this._drill_LSR_sprites.push(temp_sprite);
			this._drill_LSR_layer.addChild(temp_sprite);
		}
		this._drill_LSR_CharSpriteLen = this._characterSprites.length;
	}
}
//==============================
// * 镜像 - 删除镜像（接口）
//==============================
Spriteset_Map.prototype.drill_LSR_deleteEventReflect = function( e_id ){
	if( this._drill_LSR_sprites == undefined ){ return; }	//（如果地图禁用镜像，连此数组都不会存在）
	
	for(var i = this._drill_LSR_sprites.length-1; i >= 0; i--){
		var temp_sprite = this._drill_LSR_sprites[i];
		if( temp_sprite == undefined ){ continue; }
		if( temp_sprite._character == undefined ){ continue; }
		if( temp_sprite._character._eventId == e_id ){
			
			// > 去除贴图
			temp_sprite._character = null;
			this._drill_LSR_layer.removeChild( temp_sprite );
			
			// > 断开关联
			this._drill_LSR_sprites.splice( i, 1 );
			
			this._drill_LSR_CharSpriteLen -= 1;
		}
	}
}
//==============================
// * 帧刷新 - 子贴图排序
//==============================
Spriteset_Map.prototype.drill_LSR_updateChildSort = function() {
	if( this._drill_LSR_layer == undefined ){ return; }
	
	// > 根据对称值排序
    this._drill_LSR_layer.children.sort(this.drill_LSR_compareChildOrder.bind(this));
};
//==============================
// * 帧刷新 - 子贴图排序 - 比较器
//==============================
Spriteset_Map.prototype.drill_LSR_compareChildOrder = function( a, b ){
    if( a._drill_zIndex !== b._drill_zIndex ){
        return a._drill_zIndex - b._drill_zIndex;
    }else{
        return a.spriteId - b.spriteId;
    }
};

//=============================================================================
// ** 毛玻璃效果
//=============================================================================
//==============================
// * 帧刷新 - 毛玻璃效果控制
//==============================
Spriteset_Map.prototype.drill_LSR_updateBlurFilter = function() {
	if( this._drill_LSR_layer == undefined ){ return; }
	if( this._drill_LSR_blurAdded == $gameMap._drill_LSR_blurEnable ){ return; }
	this._drill_LSR_blurAdded = $gameMap._drill_LSR_blurEnable;
	
	// > 设置模糊滤镜
	if( this._drill_LSR_blurAdded == true ){
		var blurFilter = this.drill_LSR_getBlurFilter();
		this._drill_LSR_layer.filters = [ blurFilter, this._drill_LSR_cf ];
		
	// > 关闭模糊滤镜
	}else{
		this._drill_LSR_layer.filters = [ this._drill_LSR_cf ];
	}
}
//==============================
// * 地图图层 - 获取模糊滤镜
//==============================
Spriteset_Map.prototype.drill_LSR_getBlurFilter = function() {
	
	// > 有则直接返回
	if( this._drill_LSR_blurFilter ){
		return this._drill_LSR_blurFilter;
	}
	
	// > 没有则创建
	var bf = new PIXI.filters.BlurFilter();
	bf.blur = DrillUp.g_LSR_blurValue;
	bf.quality = 1;
	this._drill_LSR_blurFilter = bf;
	return bf;
}


//=============================================================================
// ** 镜像贴图【Drill_Sprite_LSR】
//
//			主功能：	作为镜像的贴图。
//			说明：		此贴图继承于 Sprite_Character 事件贴图，
//						后面装饰事件贴图的所有插件，都要考虑可能对镜像造成的影响。
//=============================================================================
//==============================
// * 镜像贴图 - 定义
//==============================
function Drill_Sprite_LSR() {
	this.initialize.apply(this, arguments);
}
Drill_Sprite_LSR.prototype = Object.create(Sprite_Character.prototype);
Drill_Sprite_LSR.prototype.constructor = Drill_Sprite_LSR;
//==============================
// * 镜像贴图 - 初始化
//==============================
Drill_Sprite_LSR.prototype.initialize = function(character) {
	Sprite_Character.prototype.initialize.call(this,character);
	this.opacity = 0;
	this._drill_hide = false;			//隐藏标记
	this._drill_zIndex = 0;				//镜像之间的先后顺序
};
//==============================
// * 优化 - 镜头之外的事件，不刷新镜像
//==============================
Drill_Sprite_LSR.prototype.drill_LSR_isNearTheScreen = function() {
	if( !this._character ){ return false; }	//无事件的贴图直接跳过
	
    var gw = Graphics.width + 48*4;		//加宽识别范围
    var gh = Graphics.height + 48*4;
    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var px = this._character.scrolledX() * tw + tw / 2 - gw / 2;
    var py = this._character.scrolledY() * th + th / 2 - gh / 2;
    return px >= -gw && px <= gw && py >= -gh && py <= gh;
}
//==============================
// * 镜像贴图 - 帧刷新
//==============================
Drill_Sprite_LSR.prototype.update = function() {
	
	// > 性能优化
	if( DrillUp.g_LSR_auto_close == true && 
		this.drill_LSR_isNearTheScreen() == false ){	//不在镜头范围内，直接关闭update（能直接节省210ms左右性能）
		this.visible = false;
		return;
	}
	
	// > 父类帧刷新
	Sprite_Character.prototype.update.call(this);
	
	if( this._character == undefined ){ return; }
	this.drill_updatePosition();		//帧刷新 - 位置
	this.drill_updateZIndex();			//帧刷新 - 先后顺序
	this.drill_updateVisible();			//帧刷新 - 可见情况
};
//==============================
// * 帧刷新 - 位置
//
//			说明：	该函数与 Game_CharacterBase.prototype.screenY 公式一样。
//==============================
Drill_Sprite_LSR.prototype.drill_updatePosition = function() {
	if( this._character == undefined ){ return; }
	var screen_real_y = 0;
	
	// > 同步镜像公式 - 单行同步
	if( $gameSystem._drill_LSR_mode == "单行同步" ){
		screen_real_y = $gameMap.adjustY( $gameSystem._drill_LSR_tileEdge );	//（无视当前事件的位置，直接固定位置）
	}
	// > 同步镜像公式 - 等距同步
	if( $gameSystem._drill_LSR_mode == "等距同步" ){
		screen_real_y = -1 * this._character.scrolledY() + $gameMap.adjustY( $gameSystem._drill_LSR_tileEdge ) * 2;
	}
	
	// > 单位换算
	var screen_y = Math.round( screen_real_y * $gameMap.tileHeight() );
	
	
	// > 偏移补正值 - 单行同步
	if( $gameSystem._drill_LSR_mode == "单行同步" ){
		screen_y -= this._character.jumpHeight();		//（只留高度影响）
	}
	// > 偏移补正值 - 等距同步
	if( $gameSystem._drill_LSR_mode == "等距同步" ){
		screen_y += this._character.drill_LSR_fixY();	//（插件补正）
		screen_y -= this._character.jumpHeight();		//（跳跃高度补正）
		screen_y -= this._character.drill_reverseOffsetY();
	}
	
	this.y = screen_y;
};
//==============================
// * 帧刷新 - 先后顺序
//==============================
Drill_Sprite_LSR.prototype.drill_updateZIndex = function() {
	if( this._character == undefined ){ return; }
	
	this._drill_zIndex = -1 * Math.abs( this._character.scrolledY() - ($gameSystem._drill_LSR_tileEdge - $gameMap._displayY) );
	
	// > 被举起时，上调y值
	if( this._character instanceof Game_Event &&
		this._character._drill_PT_is_being_lift ){
		this._drill_zIndex += 0.5;
	}
};
//==============================
// * 帧刷新 - 可见情况
//==============================
Drill_Sprite_LSR.prototype.drill_updateVisible = function() {
	
	// > 透明度
	if( this._character.drill_LSR_isOpacitySync() ){
		this.opacity = Math.min( this._character._opacity ,255) ;
	}else{
		this.opacity = 255;
	}
	
	// > 可见
	this.visible = this._character.drill_LSR_isReflect() && !this._drill_hide ;
	if( this._character.drill_LSR_isOpacitySync() && this._character._transparent == true ){ 	//透明状态同步
		this.visible = false; 
	}
};
//==============================
// * 行走图倒转
//==============================
Drill_Sprite_LSR.prototype.characterPatternY = function() {
	if( this._character.direction() == 2 && !this._character.drill_LSR_isLockDir() ){ return (8-2) /2 ; }
	if( this._character.direction() == 8 && !this._character.drill_LSR_isLockDir() ){ return (2-2) /2 ; }
    return (this._character.direction() - 2) / 2;
};
//==============================
// * 物体 - 插件补正高度
//
//			说明：	org_screenY是原函数screenY的公式。
//					此函数返回 其他插件多次继承screenY 而造成的高度差。
//==============================
Game_CharacterBase.prototype.drill_LSR_fixY = function(){
    var th = $gameMap.tileHeight();
	var org_screenY = Math.round(this.scrolledY() * th + th - this.shiftY() - this.jumpHeight());
    return this.screenY() - org_screenY;
};


//=============================================================================
// * 兼容设置
//=============================================================================
//==============================
// * 兼容 - 去掉相关的函数
//==============================
Drill_Sprite_LSR.prototype.updateAnimation = function() {}	//动画遮挡
Drill_Sprite_LSR.prototype.updateBalloon = function() {}	//气泡遮挡
//==============================
// * 兼容 - mog粒子
//==============================
if(Imported.MOG_CharParticles){
	Drill_Sprite_LSR.prototype.canUpdateParticles = function() {
		return false;
	}
}
//==============================
// * 兼容 - mog粉碎
//==============================
if(Imported.MOG_CharParticles){
	Drill_Sprite_LSR.prototype.createShatterSprites = function() {
		this._drill_hide = true;
		return;
	}
	Drill_Sprite_LSR.prototype.updateShatterEffect = function() {
		this._drill_hide = true;
		return;
	}
}


//=============================================================================
// ** 地图图块遮罩【Drill_Sprite_LSR_Mask】
//
//			主功能：	充当所有镜像的底层镜面。
//			说明：		由于是mask，所以只能用sprite类对象。
// 			代码：		该贴图用法特殊，不遵循一般规则。
//=============================================================================
//==============================
// * 地图图块遮罩 - 定义
//==============================
function Drill_Sprite_LSR_Mask() {
	this.initialize.apply(this, arguments);
}
Drill_Sprite_LSR_Mask.prototype = Object.create(Sprite.prototype);
Drill_Sprite_LSR_Mask.prototype.constructor = Drill_Sprite_LSR_Mask;
//==============================
// * 地图图块遮罩 - 初始化
//==============================
Drill_Sprite_LSR_Mask.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	
	// > 私有参数初始化
	this._drill_src_bitmap = null;			//（资源贴图对象）
	this._drill_bitmap_inited = false;		//（贴图处理）
	
	// > 绘制图像
	this.drill_LSR_drawBitmap();
}
//==============================
// * 地图图块遮罩 - 绘制图像
//==============================
Drill_Sprite_LSR_Mask.prototype.drill_LSR_drawBitmap = function() {
	
	// > 配置的镜面
	if( DrillUp.g_LSR_reflectionMap != "" ){
		this._drill_src_bitmap = ImageManager.load_MapReflection(DrillUp.g_LSR_reflectionMap);
		return;
	}
	
	// > 图块自适应镜面
	var temp_bitmap = new Bitmap( $gameMap.width()*$gameMap.tileWidth() , $gameMap.height()*$gameMap.tileHeight() );
	for(var xx = 0; xx < $gameMap.width(); xx++ ){
		for(var yy = 0; yy < $gameMap.height(); yy++ ){
			var terrainTag = $gameMap.terrainTag(xx, yy);
			var regionId = $gameMap.regionId(xx, yy);
			
			if( DrillUp.g_LSR_terrainIds.contains(terrainTag) || 
				DrillUp.g_LSR_areaIds.contains(regionId) ){
				
				temp_bitmap.fillRect( 
					xx* $gameMap.tileWidth(), 
					yy* $gameMap.tileHeight(), 
					$gameMap.tileWidth(), 
					$gameMap.tileHeight(), 
					"#ffffff" );
			}else{
				temp_bitmap.fillRect( 
					xx* $gameMap.tileWidth(), 
					yy* $gameMap.tileHeight(), 
					$gameMap.tileWidth(), 
					$gameMap.tileHeight(), 
					"#000000" );
			}
		}
	}
	this._drill_src_bitmap = temp_bitmap;
}
//==============================
// * 地图图块遮罩 - 帧刷新
//==============================
Drill_Sprite_LSR_Mask.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	// > 位置刷新
	this.x = -$gameMap.displayX()* $gameMap.tileWidth();
	this.y = -$gameMap.displayY()* $gameMap.tileHeight();
	
	// > 图像初始化
	if( this._drill_bitmap_inited == false && this._drill_src_bitmap.isReady() == true ){
		this._drill_bitmap_inited = true;
		
		// > 贴图扩展处理（再次绘制图像）
		var bitmap = this._drill_src_bitmap;
		var ww = bitmap.width;
		var hh = bitmap.height;
		var n_bitmap = new Bitmap( ww + Graphics.boxWidth, hh + Graphics.boxHeight );
		n_bitmap.blt( bitmap, 0, 0, ww, hh, 0,  0,  ww, hh );	//（平铺四块）
		n_bitmap.blt( bitmap, 0, 0, ww, hh, ww, 0,  ww, hh );
		n_bitmap.blt( bitmap, 0, 0, ww, hh, 0,  hh, ww, hh );
		n_bitmap.blt( bitmap, 0, 0, ww, hh, ww, hh, ww, hh );
		
		this.bitmap = n_bitmap;
	}
}


