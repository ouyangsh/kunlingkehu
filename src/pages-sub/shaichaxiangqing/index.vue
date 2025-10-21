<route lang="json5">
{
  style: {
    navigationBarTitleText: '筛查详情',
    navigationStyle: 'custom',
  },
}
</route>

<template>
  <buju title="合规筛查报告">
    <!-- 标签页 -->
    <div
      class="flex border-b border-gray-200 mx-30rpx fixed w-100vw z10 bg-#f2f5fa py2 overflow-auto"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        @click="scrollToSection(index)"
        :class="[
          'flex justify-center whitespace-nowrap items-center mr4 text-center px2 h60rpx  text-28rpx relative transition-all rounded-8rpx duration-200',
          activeTab === index
            ? 'text-blue-600 font-600 bg-#DDE6F9'
            : 'text-gray-600 font-400 bg-#FFFFFF',
        ]"
      >
        {{ tab }}
      </div>
    </div>

    <!-- 内容区域 -->
    <scroll-view
      ref="scrollViewRef"
      class="flex-1 scroll-container"
      scroll-y
      :scroll-into-view="scrollIntoViewId"
      :scroll-with-animation="true"
    >
      <div id="section-0" class="px-30rpx mb-3 mt13">
        <!-- 查询信息 -->
        <div v-if="reportDetail" class="rounded-16rpx mb-30rpx">
          <div class="space-y-16rpx text-26rpx">
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询机构：</span>
              <span class="text-#333333">{{ reportDetail.tenantName || '' }}</span>
            </div>
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询账号：</span>
              <span class="text-#333333">{{ reportDetail.loginUserName || '' }}</span>
            </div>
            <div class="flex">
              <span class="text-#777777 w-160rpx">查询时间：</span>
              <span class="text-#333333">{{ reportDetail.riskDate || '' }}</span>
            </div>
          </div>
        </div>

        <!-- 查询对象基本信息 -->
        <div id="section-1" v-if="reportDetail && reportDetail.basicInfo" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx">一、查询对象基本信息</div>
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777 w-160rpx">单据文件名称：</span>
                <span class="text-#333333">{{ reportDetail.basicInfo.fileName || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">单据类型：</span>
                <span class="text-#333333">
                  {{ reportDetail.basicInfo.documentTemplateName || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777 w-160rpx">客户名称：</span>
                <span class="text-#333333">
                  {{ reportDetail.basicInfo.customerName || '' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 查询对象提取信息 -->
        <div id="section-2" v-if="reportDetail && reportDetail.retrieveInfo" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx">二、查询对象提取信息</div>

          <!-- 单据信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">单据信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777">海关编号：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.customsCode || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">申报日期：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.declareDate || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">提运单号：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.billOfLadingNo || '' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 交易方信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">交易方信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777">境内发货人：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.domesticConsignor || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">境外收货人：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.overseasConsignee || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">生产销售单位：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.productionSalesCompany || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">申报单位：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.declareCompany || '' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 物流信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">物流信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777">运输方式：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.transportMode || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">运输工具名称：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.transportToolName || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">航次号：</span>
                <span class="text-#333333">{{ reportDetail.retrieveInfo.voyageNo || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777">集装箱号：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.containerNo || '' }}
                </span>
              </div>
            </div>
          </div>

          <!-- 位置信息段 -->
          <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
            <div class="text-28rpx font-600 mb-20rpx">位置信息段</div>
            <div class="space-y-16rpx text-26rpx">
              <div class="flex">
                <span class="text-#777777">境内发货人城市：</span>
                <span class="text-#333333">
                  {{ reportDetail.retrieveInfo.senderCity || '' }}
                </span>
              </div>
              <div class="flex">
                <span class="text-#777777">离境口岸：</span>
                <span class="text-#333333">{{ getDeparturePortName() || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777">贸易国(地区)：</span>
                <span class="text-#333333">{{ getTradeCountryName() || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777">指运港：</span>
                <span class="text-#333333">{{ getDestinationPortName() || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777">原产国(地区)：</span>
                <span class="text-#333333">{{ getOriginCountryName() || '' }}</span>
              </div>
              <div class="flex">
                <span class="text-#777777">最终目的国(地区)：</span>
                <span class="text-#333333">{{ getFinalDestinationCountryName() || '' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 合规风险筛查结果 -->
        <div id="section-3" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx font-600 text-#333333">三、合规风险筛查结果</div>

          <!-- 自定义表格 -->
          <div class="bg-white rounded-8rpx overflow-hidden" style="border: 1px solid #e0e0e0">
            <!-- 表格头部 -->
            <div
              class="flex bg-#F5F5F5 text-28rpx font-600 text-#333333"
              style="border-bottom: 1px solid #e0e0e0"
            >
              <div class="w-100rpx py-20rpx text-center" style="border-right: 1px solid #e0e0e0">
                标识
              </div>
              <div class="flex-1 py-20rpx text-center" style="border-right: 1px solid #e0e0e0">
                项目
              </div>
              <div class="w-120rpx py-20rpx text-center">筛查结果</div>
            </div>

            <!-- 表格内容 -->
            <div class="flex">
              <!-- 左侧标识列 -->
              <div class="w-100rpx" style="border-right: 1px solid #e0e0e0">
                <!-- 单据信息段标识 - 对应4行，每行66rpx，共264rpx -->
                <div
                  class="text-center bg-white flex items-center justify-center"
                  style="height: 265rpx; border-bottom: 1px solid #e0e0e0"
                >
                  <div
                    class="text-26rpx font-600 text-#2563EB"
                    style="writing-mode: vertical-rl; text-orientation: mixed"
                  >
                    单据信息段
                  </div>
                </div>
                <!-- 物流信息段标识 - 对应3行，每行66rpx，共198rpx -->
                <div
                  class="text-center bg-white flex items-center justify-center"
                  style="height: 198rpx"
                >
                  <div
                    class="text-26rpx font-600 text-#2563EB"
                    style="writing-mode: vertical-rl; text-orientation: mixed"
                  >
                    物流信息段
                  </div>
                </div>
              </div>

              <!-- 中间项目列 -->
              <div class="flex-1" style="border-right: 1px solid #e0e0e0">
                <!-- 单据信息段内容 -->
                <div style="border-bottom: 1px solid #e0e0e0">
                  <!-- 海关编号 -->
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      height: 66rpx;
                      padding: 0 24rpx;
                      border-bottom: 1px solid #e0e0e0;
                    "
                  >
                    <div class="text-26rpx text-#333333">
                      海关编号：{{ reportDetail?.retrieveInfo?.customsCode }}
                    </div>
                  </div>
                  <!-- 申报日期 -->
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      height: 66rpx;
                      padding: 0 24rpx;
                      border-bottom: 1px solid #e0e0e0;
                    "
                  >
                    <div class="text-26rpx text-#333333">
                      申报日期：{{ reportDetail?.retrieveInfo?.declareDate }}
                    </div>
                  </div>
                  <!-- 提运单号 -->
                  <div
                    style="
                      display: flex;
                      align-items: c enter;
                      height: 66rpx;
                      padding: 0 24rpx;
                      border-bottom: 1px solid #e0e0e0;
                    "
                  >
                    <div class="text-26rpx text-#333333">
                      提运单号：{{ reportDetail?.retrieveInfo?.billOfLadingNo }}
                    </div>
                  </div>
                  <!-- 运输方式 -->
                  <div style="display: flex; align-items: center; height: 66rpx; padding: 0 24rpx">
                    <div class="text-26rpx text-#333333">
                      运输方式：{{ reportDetail?.retrieveInfo?.transportMode }}
                    </div>
                  </div>
                </div>

                <!-- 物流信息段内容 -->
                <div>
                  <!-- 运输工具名称 -->
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      height: 66rpx;
                      padding: 0 24rpx;
                      border-bottom: 1px solid #e0e0e0;
                    "
                  >
                    <div class="text-26rpx text-#333333">
                      运输工具名称：{{ reportDetail?.retrieveInfo?.transportToolName }}
                    </div>
                  </div>
                  <!-- 航次号 -->
                  <div
                    style="
                      display: flex;
                      align-items: c enter;
                      height: 66rpx;
                      padding: 0 24rpx;
                      border-bottom: 1px solid #e0e0e0;
                    "
                  >
                    <div class="text-26rpx text-#333333">
                      航次号：{{ reportDetail?.retrieveInfo?.voyageNo }}
                    </div>
                  </div>
                  <!-- 集装箱号 -->
                  <div style="display: flex; align-items: center; height: 66rpx; padding: 0 24rpx">
                    <div class="text-26rpx text-#333333">
                      集装箱号：{{ reportDetail?.retrieveInfo?.containerNo }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- 右侧结果列 -->
              <div class="w-120rpx">
                <!-- 单据信息段结果区域 - 空白，对应4行×66rpx=264rpx -->
                <div class="bg-white" style="height: 264rpx; border-bottom: 1px solid #e0e0e0">
                  <!-- 单据信息段不显示筛查结果 -->
                </div>

                <!-- 物流信息段结果区域 - 显示筛查结果，对应3行×66rpx=198rpx -->
                <div class="bg-white flex items-center justify-center" style="height: 198rpx">
                  <div
                    class="text-center text-24rpx text-#666666 leading-relaxed px-8rpx"
                    v-html="getShipScreeningResult()"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 合规筛查结果详情 -->
        <div id="section-4" class="mb-30rpx">
          <div class="text-32rpx mb-20rpx">四、合规筛查结果详情</div>

          <!-- 4.1 交易方筛查 -->
          <div class="mb-30rpx">
            <div class="text-28rpx text-#2866EB mb-20rpx">4.1 交易方筛查</div>

            <!-- 未命中显示 -->
            <div class="text-26rpx text-#333333 mb-20rpx">未命中显示</div>

            <!-- 交易方信息表格 -->
            <div class="bg-white rounded-16rpx overflow-hidden border border-#E5E5E5">
              <!-- 生产销售单位 -->
              <div class="flex border-b border-#E5E5E5">
                <div
                  class="w-200rpx p-20rpx text-26rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  生产销售单位
                </div>
                <div class="flex-1 p-20rpx text-26rpx text-#333333 border-r border-#E5E5E5">
                  {{ reportDetail.retrieveInfo.productionSalesCompany || '' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-26rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>

              <!-- 境内发货人 -->
              <div class="flex border-b border-#E5E5E5">
                <div
                  class="w-200rpx p-20rpx text-26rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  境内发货人
                </div>
                <div class="flex-1 p-20rpx text-26rpx text-#333333 border-r border-#E5E5E5">
                  {{ reportDetail.retrieveInfo.domesticConsignor || '' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-26rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>

              <!-- 申报单位 -->
              <div class="flex border-b border-#E5E5E5">
                <div
                  class="w-200rpx p-20rpx text-26rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  申报单位
                </div>
                <div class="flex-1 p-20rpx text-26rpx text-#333333 border-r border-#E5E5E5">
                  {{ reportDetail.retrieveInfo.declareCompany || '' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-26rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>

              <!-- 境外收货人 -->
              <div class="flex">
                <div
                  class="w-200rpx p-20rpx text-26rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  境外收货人
                </div>
                <div class="flex-1 p-20rpx text-26rpx text-#333333 border-r border-#E5E5E5">
                  {{ reportDetail.retrieveInfo.overseasConsignee || '' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-26rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>
            </div>

            <!-- 未命中显示（底部） -->
            <div class="text-26rpx text-#333333 mt-20rpx">未命中显示</div>
          </div>

          <!-- 4.2 物流筛查 -->
          <div class="mb-30rpx">
            <div class="text-28rpx text-#2866EB mb-20rpx">4.2 物流筛查</div>

            <!-- 船舶基本信息 -->
            <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
              <div class="text-26rpx font-600 mb-20rpx">船舶基本信息</div>
              <div class="space-y-16rpx text-24rpx">
                <div class="flex">
                  <span class="text-#777777 w-120rpx">船舶名称：</span>
                  <span class="text-#333333">{{ getShipName() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">建造年份：</span>
                  <span class="text-#333333">{{ getShipBuildDate() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">船舶类型：</span>
                  <span class="text-#333333">{{ getShipType() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">IMO 编号：</span>
                  <span class="text-#333333">{{ getShipImo() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">MMSI：</span>
                  <span class="text-#333333">{{ getShipMmsi() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">呼号：</span>
                  <span class="text-#333333">{{ getShipCallsign() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">船旗：</span>
                  <span class="text-#333333">{{ getShipFlag() || '' }}</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">总吨位：</span>
                  <span class="text-#333333">{{ getShipGt() || '' }}</span>
                </div>
              </div>
            </div>

            <!-- 船舶制裁信息 -->
            <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
              <div class="text-26rpx font-600 mb-20rpx">船舶制裁信息</div>
              <div class="space-y-16rpx text-24rpx">
                <div class="flex">
                  <span class="text-#777777 w-120rpx">是否被制裁：</span>
                  <span class="text-#333333">否</span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">制裁时间：</span>
                  <span class="text-#333333"></span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">制裁发布国家：</span>
                  <span class="text-#333333"></span>
                </div>
                <div class="flex">
                  <span class="text-#777777 w-120rpx">被制裁原因：</span>
                  <span class="text-#333333"></span>
                </div>
              </div>
            </div>

            <!-- 船舶限制信息 -->
            <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
              <div class="text-26rpx font-600 mb-20rpx">船舶限制信息</div>
              <div class="space-y-16rpx text-24rpx">
                <div class="flex">
                  <span class="text-#777777 w-120rpx">限制来源：</span>
                  <span class="text-#333333"></span>
                </div>
              </div>
            </div>

            <!-- 船舶公司 -->
            <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
              <div class="text-26rpx font-600 mb-20rpx">船舶公司</div>

              <!-- 船舶公司表格 -->
              <div class="bg-white rounded-16rpx overflow-hidden border border-#E5E5E5">
                <!-- 船舶所有公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶所有公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipOwner() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶所有公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶所有公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipOwnerCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶管理公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶管理公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipManager() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶管理公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶管理公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipManagerCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶经营公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶经营公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipOperator() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶经营公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶经营公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipOperatorCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- DOC公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    DOC公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getDocCompany() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- DOC公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    DOC公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getDocCompanyCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- DOC公司IMO编号 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    DOC公司IMO编号
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getDocImo() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶注册公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶注册公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipRegisterCompany() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶注册公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶注册公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipRegisterCompanyCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶注册公司IMO编号 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶注册公司IMO编号
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipRegisterImo() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 技术管理公司 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    技术管理公司
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getTechManager() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 技术管理公司国家 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    技术管理公司国家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getTechManagerCountry() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>

                <!-- 船舶租家 -->
                <div class="flex">
                  <div
                    class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                  >
                    船舶租家
                  </div>
                  <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                    {{ getShipCharterer() || '' }}
                  </div>
                  <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>
              </div>
            </div>

            <!-- 船舶公司轨迹 -->
            <div class="bg-white rounded-16rpx p-30rpx mb-20rpx">
              <div class="text-26rpx font-600 mb-20rpx">船舶公司轨迹</div>
              <div class="text-24rpx text-#333333 mb-20rpx">
                本船舶于 90 天前到达过制裁国家。
                <br />
                该船近一年前未发现到达制裁国家/经停指定的敏感国家港口或。
              </div>

              <!-- 轨迹表格 -->
              <div class="bg-white rounded-16rpx overflow-hidden border border-#E5E5E5">
                <!-- 表头 -->
                <div
                  class="flex bg-#F5F5F5 text-24rpx font-600 text-#333333 border-b border-#E5E5E5"
                >
                  <div class="flex-1 p-20rpx text-center border-r border-#E5E5E5">日期</div>
                  <div class="flex-1 p-20rpx text-center border-r border-#E5E5E5">停靠港</div>
                  <div class="flex-1 p-20rpx text-center border-r border-#E5E5E5">停靠国家</div>
                  <div class="flex-1 p-20rpx text-center">风险信息</div>
                </div>

                <!-- 数据行 -->
                <div class="flex border-b border-#E5E5E5">
                  <div
                    class="flex-1 p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                  >
                    2025.05.10
                  </div>
                  <div
                    class="flex-1 p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                  >
                    宁波港
                  </div>
                  <div
                    class="flex-1 p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                  >
                    中国
                  </div>
                  <div class="flex-1 p-20rpx text-center text-24rpx text-#666666">
                    不在敏感信息名单中
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 4.3 位置筛查 -->
          <div class="mb-30rpx">
            <div class="text-28rpx text-#2866EB mb-20rpx">4.3 位置筛查</div>

            <!-- 位置筛查表格 -->
            <div class="bg-white rounded-16rpx overflow-hidden border border-#E5E5E5">
              <!-- 离境口岸代码 -->
              <div class="flex border-b border-#E5E5E5">
                <div
                  class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  离境口岸代码
                </div>
                <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                  {{ getDeparturePortCode() || 'CAN426' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>

              <!-- 指运港代码 -->
              <div class="flex">
                <div
                  class="w-200rpx p-20rpx text-24rpx text-#2866EB bg-#F8F9FF border-r border-#E5E5E5"
                >
                  指运港代码
                </div>
                <div class="flex-1 p-20rpx text-24rpx text-#333333 border-r border-#E5E5E5">
                  {{ getDestinationPortCode() || 'CHN126' }}
                </div>
                <div class="w-200rpx p-20rpx text-center text-24rpx text-#666666">
                  不在敏感信息名单中
                </div>
              </div>
            </div>
          </div>

          <!-- 4.4 商品筛查 -->
          <div class="mb-30rpx">
            <div class="text-28rpx text-#2866EB mb-20rpx">4.4 商品筛查</div>

            <!-- 商品信息列表 -->
            <div class="space-y-20rpx">
              <!-- 商品信息1 -->
              <div class="bg-white rounded-16rpx p-30rpx">
                <div class="text-26rpx font-600 mb-20rpx text-#333333">商品信息</div>
                <div class="space-y-16rpx text-24rpx">
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品名称：</span>
                    <span class="text-#333333">其他贵金属；陶瓷；及其制品</span>
                  </div>
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品编码：</span>
                    <span class="text-#333333">Chapter 81</span>
                  </div>
                  <div class="text-24rpx text-#E74C3C font-500">欧盟特定限制</div>
                </div>
              </div>

              <!-- 商品信息2 -->
              <div class="bg-white rounded-16rpx p-30rpx">
                <div class="text-26rpx font-600 mb-20rpx text-#333333">商品信息</div>
                <div class="space-y-16rpx text-24rpx">
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品名称：</span>
                    <span class="text-#333333">
                      化钨和合金，不受1C117 (3)、1C226 (4)、II.A1.013 (5)或II.A1.017
                      (6)的控制，含钨量超过90%
                      （按重量计）。注1：出于本控制目的，电线被排除在外。注2：出于本控制目的，手术或医疗器具被排除在外。
                    </span>
                  </div>
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品编码：</span>
                    <span class="text-#333333">ex 8101 94</span>
                  </div>
                  <div class="text-24rpx text-#E74C3C font-500">欧盟特定限制</div>
                </div>
              </div>

              <!-- 商品信息3 -->
              <div class="bg-white rounded-16rpx p-30rpx">
                <div class="text-26rpx font-600 mb-20rpx text-#333333">商品信息</div>
                <div class="space-y-16rpx text-24rpx">
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品名称：</span>
                    <span class="text-#333333">其他贵金属；陶瓷；</span>
                  </div>
                  <div class="flex">
                    <span class="text-#777777 w-120rpx">商品编码：</span>
                    <span class="text-#333333">81</span>
                  </div>
                  <div class="text-24rpx text-#E74C3C font-500">欧盟特定限制</div>
                </div>
              </div>

              <!-- 注释信息 -->
              <div class="bg-#F8F9FA rounded-16rpx p-30rpx">
                <div class="text-24rpx text-#666666">
                  注：商品详细信息描述，可以通过文字列示在下面，等补充
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 五、处理意见 -->
        <div id="section-5" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">五、处理意见</div>

          <!-- 处理意见表格 -->
          <div class="bg-white rounded-16rpx overflow-hidden border border-#E5E5E5">
            <!-- 表头 -->
            <div class="flex bg-#F5F5F5 text-24rpx font-600 text-#333333 border-b border-#E5E5E5">
              <div class="w-120rpx p-20rpx text-center border-r border-#E5E5E5">处理人</div>
              <div class="w-140rpx p-20rpx text-center border-r border-#E5E5E5">处理状态</div>
              <div class="w-160rpx p-20rpx text-center border-r border-#E5E5E5">认定风险等级</div>
              <div class="w-180rpx p-20rpx text-center border-r border-#E5E5E5">处理时间</div>
              <div class="flex-1 p-20rpx text-center">备注</div>
            </div>

            <!-- 数据行 -->
            <div v-if="reportDetail?.handleLogList && reportDetail.handleLogList.length > 0">
              <div
                v-for="(log, index) in reportDetail.handleLogList"
                :key="index"
                class="flex border-b border-#E5E5E5 last:border-b-0"
              >
                <div
                  class="w-120rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                >
                  {{ log.handler || '' }}
                </div>
                <div
                  class="w-140rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                >
                  {{ log.status || '' }}
                </div>
                <div
                  class="w-160rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                >
                  {{ log.riskLevel || '' }}
                </div>
                <div
                  class="w-180rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
                >
                  {{ log.handleTime || '' }}
                </div>
                <div class="flex-1 p-20rpx text-center text-24rpx text-#333333">
                  {{ log.remark || '' }}
                </div>
              </div>
            </div>
            <!-- 无数据时显示空行 -->
            <div v-else class="flex">
              <div
                class="w-120rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
              ></div>
              <div
                class="w-140rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
              ></div>
              <div
                class="w-160rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
              ></div>
              <div
                class="w-180rpx p-20rpx text-center text-24rpx text-#333333 border-r border-#E5E5E5"
              ></div>
              <div class="flex-1 p-20rpx text-center text-24rpx text-#333333"></div>
            </div>
          </div>
        </div>

        <!-- 六、单据附件 -->
        <div id="section-6" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">六、单据附件</div>

          <!-- 附件展示 -->
          <div class="bg-white rounded-16rpx p-30rpx">
            <!-- 有附件时显示 -->
            <div
              v-if="
                reportDetail?.documentImgBase64List && reportDetail.documentImgBase64List.length > 0
              "
            >
              <div
                v-for="(imgBase64, index) in reportDetail.documentImgBase64List"
                :key="index"
                class="mb-30rpx last:mb-0"
              >
                <image
                  :src="`data:image/jpeg;base64,${imgBase64}`"
                  mode="widthFix"
                  class="w-full rounded-8rpx border border-#E5E5E5"
                  @error="onImageError"
                />
              </div>
            </div>

            <!-- 无附件时显示占位符 -->
            <div
              v-else
              class="flex items-center justify-center bg-#F8F9FA rounded-8rpx border border-#E5E5E5 py-80rpx"
            >
              <div class="text-center">
                <i class="icon-icon-wenjian text-60rpx text-#CCCCCC mb-20rpx"></i>
                <div class="text-26rpx text-#999999">暂无附件</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 七、附注 -->
        <div id="section-7" class="mb-60rpx">
          <div class="text-32rpx mb-30rpx">七、附注</div>

          <!-- 附注内容 -->
          <div class="bg-white rounded-16rpx p-30rpx">
            <div class="space-y-24rpx text-26rpx text-#333333 leading-relaxed">
              <div>
                <span class="font-600">1.</span>
                本合规建议模板仅供参考，具体操作需遵循公司合规政策和相关法律法规。
              </div>
              <div>
                <span class="font-600">2.</span>
                本合规建议模板的解释权归公司合规部门所有
              </div>
              <div>
                <span class="font-600">3.</span>
                本合规建议模板自发布之日起实施，如有变更，以最新版本为准。
              </div>
            </div>

            <!-- 底部说明 -->
            <div class="mt-40rpx pt-30rpx border-t border-#E5E5E5">
              <div class="text-24rpx text-#E74C3C text-center">
                *请根据实际查询结果和公司政策，填写并执行相应措施。
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>

    <template #footer>
      <div class="bottom-toolbar box-border">
        <!-- 底部操作栏 -->
        <div class="flex items-center justify-around h-full px-30rpx">
          <div class="flex flex-col items-center justify-center" @click="editReport">
            <i class="icon-icon-bianji font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">修改</text>
          </div>

          <div class="flex flex-col items-center" @click="guidang = true">
            <i class="icon-icon-guidang font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">归档</text>
          </div>

          <div class="flex flex-col items-center" @click="exportReport">
            <i class="icon-icon-daochu font_family !text-35rpx"></i>
            <text class="text-18rpx mt2 text-#444444">导出筛查报告</text>
          </div>

          <div class="flex flex-col items-center" @click="shanchu = true">
            <i class="icon-icon0shanchu font_family !text-35rpx text-red"></i>
            <text class="text-18rpx mt2 text-red">删除</text>
          </div>
        </div>
      </div>
    </template>
  </buju>

  <wd-popup v-model="guidang" custom-style="height: 600rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center px-40rpx">
      <div class="text-32rpx my40rpx">归档</div>
      <div class="text-28rpx mb-30rpx text-#666666">请输入归档说明</div>

      <!-- 归档说明输入框 -->
      <textarea
        v-model="archiveMsg"
        placeholder="请输入归档说明..."
        class="w-100% h-200rpx p-20rpx border border-#E5E5E5 rounded-8rpx text-28rpx mb-40rpx"
        maxlength="200"
        show-confirm-bar="false"
      />

      <div class="h-88rpx rounded-md flex items-center justify-evenly w-100% mb-20rpx">
        <div
          @click="guidanghanshu(false)"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="guidanghanshu(true)"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
  <wd-popup v-model="shanchu" custom-style="height: 364rpx; width: 630rpx; border-radius: 20rpx ">
    <div class="flex flex-col items-center">
      <div class="text-32rpx my40rpx">删除提示</div>
      <div class="text-32rpx my20rpx">请确认是否删除此分类？</div>
      <div class="h-88rpx rounded-md flex items-center justify-evenly mt40rpx w-630rpx mb-20rpx">
        <div
          @click="shanchuhanshu(false)"
          class="text-32rpx w270rpx h88rpx bg-#F4F6FA flex justify-center items-center rounded-md"
        >
          取消
        </div>
        <div
          @click="shanchuhanshu(true)"
          class="text-32rpx w270rpx h88rpx text-#fff bg-#2563EB flex justify-center items-center rounded-md"
        >
          确定
        </div>
      </div>
    </div>
  </wd-popup>
</template>
<script setup lang="js">
import { ref, onMounted, computed } from 'vue'
import { http } from '@/utils/http'
import { useUserStore } from '@/store'

const statusBarHeight = ref(0)
// 报告详情数据
const reportDetail = ref(null)
const activeTab = ref(0)
const datetimePickerRef = ref()
const dateRange = ref(['', Date.now()]) // For v-model
const startDate = ref('') // For display
const endDate = ref('') // For display

// scroll-view相关
const scrollViewRef = ref()
const scrollIntoViewId = ref('')
const guidang = ref(false)
const archiveMsg = ref('')

const guidanghanshu = async (value) => {
  if (!value) {
    guidang.value = false
    archiveMsg.value = ''
    return
  }

  // 获取documentId
  const documentId = reportDetail.value?.documentId
  if (!documentId) {
    uni.showToast({
      title: '未找到文档ID',
      icon: 'none',
    })
    return
  }

  try {
    uni.showLoading({
      title: '归档中...',
    })

    // 调用归档API
    const response = await http({
      url: '/tscc/document/archived',
      method: 'POST',
      data: {
        id: documentId,
        msg: archiveMsg.value.trim(),
      },
    })

    uni.hideLoading()

    if (response.code === 200) {
      uni.showToast({
        title: '归档成功',
        icon: 'success',
      })

      // 关闭弹窗并清空输入
      guidang.value = false
      archiveMsg.value = ''

      // 可以选择返回上一页或刷新页面
      setTimeout(() => {
        uni.navigateBack()
      }, 1500)
    } else {
      uni.showToast({
        title: response.msg || '归档失败',
        icon: 'none',
      })
    }
  } catch (error) {
    uni.hideLoading()
    console.error('归档失败:', error)
    uni.showToast({
      title: '归档失败，请重试',
      icon: 'none',
    })
  }
}
const shanchu = ref(false)
const shanchuhanshu = (value) => {
  shanchu.value = false
  if (value) {
    // 删除操作
  }
}

// 标签页数据
const tabs = [
  '一、查询对象基本信息',
  '二、查询对象提取信息',
  '三、合规风险筛查结果',
  '四、合规筛查结果详情',
  '五、处理意见',
  '六、单据附件',
  '七、附注',
]

// 商品信息数据
const goodsInfo = ref([
  {
    checked: true,
    name: '同轴连接器',
    category: 'CN',
    code: '8536909000',
    description:
      '用于功能或环路改或连接控制的电气设备，电压不超过1000V（不包拓继电器，自动断路器及其他开关设备）及其零件（电话机除外）',
    publishCountry: '欧盟(EU)',
    controlList: '欧盟对华调控清单(EUCTICRL)',
    searchCode: '无',
    customsCode: '853690',
    controlCountry: '马来兰(UKR)',
    tariffCode: '',
    chemicalCode: '',
    supervisionGroup: '',
  },
  {
    checked: false,
    name: '同轴连接器',
    category: 'CN',
    code: '8536909000',
    description:
      '用于功能或环路改或连接控制的电气设备，电压不超过1000V（不包括继电器，自动断路器及其他开关设备，雷电设备及其零件）',
    publishCountry: '欧盟(EU)',
    controlList: '欧盟对华调控清单(EUCTICRL)',
    searchCode: '无',
    customsCode: '853690',
    controlCountry: '马来兰(UKR)',
    tariffCode: '',
    chemicalCode: '',
    supervisionGroup: '',
  },
])

// 全选相关的计算属性和方法
const isAllChecked = computed(() => {
  return goodsInfo.value.length > 0 && goodsInfo.value.every((item) => item.checked)
})

const checkedCount = computed(() => {
  return goodsInfo.value.filter((item) => item.checked).length
})

const toggleAllSelection = () => {
  const shouldCheck = !isAllChecked.value
  goodsInfo.value.forEach((item) => {
    item.checked = shouldCheck
  })
}

const toggleItemSelection = (index) => {
  goodsInfo.value[index].checked = !goodsInfo.value[index].checked
}

// 滚动到指定区域的函数
const scrollToSection = (index) => {
  console.log('滚动到区域:', index, '对应的tabs:', tabs[index])

  // 更新选中状态
  activeTab.value = index

  // 使用scroll-view的scroll-into-view功能
  // tabs索引需要映射到正确的section ID
  const targetId = `section-${index + 1}`
  console.log('设置scrollIntoViewId为:', targetId)

  // 设置滚动目标ID
  scrollIntoViewId.value = targetId

  // 清空ID，允许下次滚动
  setTimeout(() => {
    scrollIntoViewId.value = ''
  }, 1000)
}

// 筛查结果表格数据
const screeningTableData = computed(() => {
  if (!reportDetail.value) return []

  return [
    {
      category: '单据信息段',
      item: `海关编号：${reportDetail.value?.retrieveInfo?.customsCode || ''}`,
      result: '',
    },
    {
      category: '',
      item: `申报日期：${reportDetail.value?.retrieveInfo?.declareDate || ''}`,
      result: '',
    },
    {
      category: '',
      item: `提运单号：${reportDetail.value?.retrieveInfo?.billOfLadingNo || ''}`,
      result: '',
    },
    {
      category: '',
      item: `运输方式：${reportDetail.value?.retrieveInfo?.transportMode || ''}`,
      result: '',
    },
    {
      category: '物流信息段',
      item: `运输工具名称：${reportDetail.value?.retrieveInfo?.transportToolName || ''}`,
      result: getShipScreeningResult(),
    },
    {
      category: '',
      item: `航次号：${reportDetail.value?.retrieveInfo?.voyageNo || ''}`,
      result: '',
    },
    {
      category: '',
      item: `集装箱号：${reportDetail.value?.retrieveInfo?.containerNo || ''}`,
      result: '',
    },
  ]
})

// 交易方信息数据
const traderInfo = ref({
  domesticCountry: '宁波杰顿科技控股有限公司',
  locationType: 'R.F. Industries, ltd.',
  entityName: '',
  entityAlias: '',
  domesticProvince: '中国浙江',
  cityName: '宁波',
  unCode: '',
  iataCode: '',
  icaoCode: '',
})

// 位置信息数据
const locationInfo = ref({
  country: '中国',
  province: '浙江省',
  city: '宁波市',
  address: '高新区研发园C区',
  postalCode: '315000',
  longitude: '121.5967',
  latitude: '29.8683',
})

// 船舶信息数据
const shipInfo = ref({
  name: '',
  buildYear: '',
  type: '',
  imoNumber: '',
  permit: '',
  proposal: '',
  isControlled: '',
  sanctionReason: '',
  typeList: '',
})

// 国家信息数据
const countryInfo = ref({
  chineseFullName: '',
  englishFullName: '',
  businessDeployment: '',
  twoDigitCode: '',
  continentCode: '',
  chineseShortName: '',
  englishShortName: '',
  domesticType: '',
  typeList: '',
})

// 修改报告
const editReport = () => {
  uni.showModal({
    title: '修改报告',
    content: '确定要修改这份筛查报告吗？',
    confirmText: '确认',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在进入编辑模式...',
          icon: 'loading',
          duration: 1500,
        })
        // 这里可以跳转到编辑页面
        // uni.navigateTo({ url: '/pages-sub/edit-report/index' })
      }
    },
  })
}

// 归档报告
const archiveReport = () => {
  uni.showModal({
    title: '归档报告',
    content: '确定要将这份报告归档吗？归档后可在历史记录中查看。',
    confirmText: '归档',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在归档...',
          icon: 'loading',
          duration: 1500,
        })
        setTimeout(() => {
          uni.showToast({
            title: '归档成功',
            icon: 'success',
          })
        }, 1500)
      }
    },
  })
}

// 导出筛查报告
const exportReport = async () => {
  // 获取documentId
  const documentId = reportDetail.value?.documentId
  if (!documentId) {
    uni.showToast({
      title: '未找到文档ID',
      icon: 'none',
    })
    return
  }

  console.log('开始导出PDF，documentId:', documentId)

  try {
    uni.showLoading({
      title: '正在导出PDF...',
    })

    // 直接使用request方式，更稳定
    await exportPdfWithRequest(documentId)
  } catch (error) {
    uni.hideLoading()
    console.error('导出失败:', error)
    uni.showToast({
      title: '导出失败，请重试',
      icon: 'none',
    })
  }
}

// 改进的PDF导出方案，兼容iOS真机
const exportPdfWithRequest = async (documentId) => {
  return new Promise((resolve, reject) => {
    console.log('使用request方式导出PDF，documentId:', documentId)

    // 获取用户token等认证信息
    const userStore = useUserStore()
    const token = userStore.token || ''

    uni.request({
      url: `${import.meta.env.VITE_SERVER_BASEURL}/tscc/document/export-pdf`,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        platform: 'mp-weixin',
        clientid: 'e5cd7e4891bf95d1d19206ce24a7b32e',
        Authorization: token ? `Bearer ${token}` : '',
      },
      data: `documentId=${documentId}`,
      responseType: 'arraybuffer',
      timeout: 30000, // 30秒超时
      success: (res) => {
        console.log('PDF请求成功，状态码:', res.statusCode)
        console.log('响应数据大小:', res.data ? res.data.byteLength : 0)

        uni.hideLoading()

        if (res.statusCode === 200 && res.data && res.data.byteLength > 0) {
          // 生成临时文件名，使用时间戳确保唯一性
          const timestamp = new Date().getTime()
          const fileName = `筛查报告_${documentId}_${timestamp}.pdf`

          try {
            // 使用uni-app的文件系统API，更兼容
            const fs = uni.getFileSystemManager()

            // 获取临时文件路径
            const tempDirPath = `${uni.env.USER_DATA_PATH}`
            const tempFilePath = `${tempDirPath}/${fileName}`

            console.log('准备写入文件:', tempFilePath)

            // 将ArrayBuffer转换为Base64
            const base64Data = uni.arrayBufferToBase64(res.data)

            // 写入文件
            fs.writeFile({
              filePath: tempFilePath,
              data: base64Data,
              encoding: 'base64',
              success: () => {
                console.log('文件写入成功:', tempFilePath)

                // 打开文件
                uni.openDocument({
                  filePath: tempFilePath,
                  fileType: 'pdf',
                  showMenu: true, // 显示分享等菜单
                  success: () => {
                    console.log('PDF打开成功')
                    uni.showToast({
                      title: 'PDF导出成功',
                      icon: 'success',
                    })
                    resolve()
                  },
                  fail: (openErr) => {
                    console.error('PDF打开失败:', openErr)

                    // 如果打开失败，尝试保存到相册或提示用户
                    uni.showModal({
                      title: '提示',
                      content: 'PDF文件已生成，但无法直接打开。是否保存到本地？',
                      success: (modalRes) => {
                        if (modalRes.confirm) {
                          // 可以尝试其他方式处理文件
                          uni.showToast({
                            title: 'PDF已保存到本地',
                            icon: 'success',
                          })
                        }
                      },
                    })
                    resolve()
                  },
                })
              },
              fail: (writeErr) => {
                console.error('文件写入失败:', writeErr)
                uni.showToast({
                  title: '文件保存失败',
                  icon: 'none',
                })
                reject(writeErr)
              },
            })
          } catch (error) {
            console.error('文件处理异常:', error)
            uni.showToast({
              title: '文件处理失败',
              icon: 'none',
            })
            reject(error)
          }
        } else {
          console.error(
            'PDF数据无效，状态码:',
            res.statusCode,
            '数据大小:',
            res.data ? res.data.byteLength : 0,
          )
          uni.showToast({
            title: '导出的PDF文件无效',
            icon: 'none',
          })
          reject(new Error('PDF数据无效'))
        }
      },
      fail: (err) => {
        uni.hideLoading()
        console.error('PDF请求失败:', err)
        uni.showToast({
          title: '网络请求失败，请重试',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

// 删除报告
const deleteReport = () => {
  uni.showModal({
    title: '删除报告',
    content: '确定要删除这份筛查报告吗？删除后无法恢复。',
    confirmText: '删除',
    confirmColor: '#ff4d4f',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '正在删除...',
          icon: 'loading',
          duration: 1500,
        })
        setTimeout(() => {
          uni.showToast({
            title: '删除成功',
            icon: 'success',
          })
          // 删除成功后可以返回上一页
          setTimeout(() => {
            uni.navigateBack()
          }, 1000)
        }, 1500)
      }
    },
  })
}

// 原有的方法保留
function handleConfirm(e) {
  if (Array.isArray(e.value) && e.value.length === 2) {
    const [start, end] = e.value
    startDate.value = formatDate(start)
    endDate.value = formatDate(end)
    dateRange.value = [start, end]
  }
}

const tiaozhuan = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

const jieguo = () => {
  uni.navigateTo({
    url: '/pages-sub/shougongshaicha/index',
  })
}

function openPicker() {
  if (datetimePickerRef.value) {
    datetimePickerRef.value.open()
  }
}

function formatDate(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight

  // 获取报告详情数据
  const reportData = uni.getStorageSync('reportDetail')
  if (reportData) {
    reportDetail.value = reportData
    console.log('获取到报告详情数据:', reportData)

    // 更新页面数据
    updatePageData()

    // 清除存储的数据
    uni.removeStorageSync('reportDetail')
  } else {
    console.log('没有找到报告详情数据')
  }
})

// 解析JSON字符串的辅助函数
const parseJsonString = (jsonStr) => {
  if (!jsonStr) return null
  try {
    return JSON.parse(jsonStr)
  } catch (e) {
    return null
  }
}

// 获取离境口岸名称
const getDeparturePortName = () => {
  // 优先从 locationList 中查找离境口岸信息
  if (reportDetail.value?.locationList) {
    const departurePort = reportDetail.value.locationList.find(
      (item) => item.itemName === '离境口岸',
    )
    if (departurePort) {
      return departurePort.itemValue || departurePort.locationName || ''
    }
  }

  // 备用方案：从 retrieveInfo.departurePortCode 获取
  if (!reportDetail.value?.retrieveInfo?.departurePortCode) return ''
  const portInfo = parseJsonString(reportDetail.value.retrieveInfo.departurePortCode)
  return portInfo?.name || ''
}

// 获取贸易国名称
const getTradeCountryName = () => {
  // 优先从 countryList 中查找贸易国信息
  if (reportDetail.value?.countryList) {
    const tradeCountry = reportDetail.value.countryList.find(
      (item) => item.itemName === '贸易国' || item.itemName === '贸易国(地区)',
    )
    if (tradeCountry) {
      return tradeCountry.itemValue || tradeCountry.cnShortName || ''
    }
  }

  // 备用方案：从 retrieveInfo.tradeCountryThreeCode 获取
  if (!reportDetail.value?.retrieveInfo?.tradeCountryThreeCode) return ''
  const countryInfo = parseJsonString(reportDetail.value.retrieveInfo.tradeCountryThreeCode)
  return countryInfo?.name || ''
}

// 获取指运港名称
const getDestinationPortName = () => {
  // 优先从 locationList 中查找指运港信息
  if (reportDetail.value?.locationList) {
    const destinationPort = reportDetail.value.locationList.find(
      (item) => item.itemName === '指运港',
    )
    if (destinationPort) {
      return destinationPort.itemValue || destinationPort.locationName || ''
    }
  }

  // 备用方案：从 retrieveInfo.destinationPortCode 获取
  if (!reportDetail.value?.retrieveInfo?.destinationPortCode) return ''
  const portInfo = parseJsonString(reportDetail.value.retrieveInfo.destinationPortCode)
  return portInfo?.name || ''
}

// 获取原产国名称
const getOriginCountryName = () => {
  // 优先从 countryList 中查找原产国信息
  if (reportDetail.value?.countryList) {
    const originCountry = reportDetail.value.countryList.find((item) => item.itemName === '原产国')
    if (originCountry) {
      return originCountry.itemValue || originCountry.cnShortName || ''
    }
  }

  // 备用方案：从 retrieveInfo.originCountryThreeCode 获取
  if (!reportDetail.value?.retrieveInfo?.originCountryThreeCode) return ''
  const countryInfo = parseJsonString(reportDetail.value.retrieveInfo.originCountryThreeCode)
  return countryInfo?.name || ''
}

// 获取最终目的国名称
const getFinalDestinationCountryName = () => {
  // 优先从 countryList 中查找最终目的国信息
  if (reportDetail.value?.countryList) {
    const finalDestCountry = reportDetail.value.countryList.find(
      (item) =>
        item.itemName === '最终目的国' ||
        item.itemName === '最终目的国(地区)' ||
        item.itemName === '运抵国',
    )
    if (finalDestCountry) {
      return finalDestCountry.itemValue || finalDestCountry.cnShortName || ''
    }
  }

  // 备用方案：从 retrieveInfo.finalDestinationCountryThreeCode 获取
  if (!reportDetail.value?.retrieveInfo?.finalDestinationCountryThreeCode) return ''
  const countryInfo = parseJsonString(
    reportDetail.value.retrieveInfo.finalDestinationCountryThreeCode,
  )
  return countryInfo?.name || ''
}

// 船舶基本信息获取函数
const getShipName = () => {
  return (
    reportDetail.value?.logisticsList?.[0]?.shipname ||
    reportDetail.value?.logisticsList?.[0]?.itemValue ||
    ''
  )
}

const getShipBuildDate = () => {
  return reportDetail.value?.logisticsList?.[0]?.builddate || ''
}

const getShipType = () => {
  return reportDetail.value?.logisticsList?.[0]?.shiptype || ''
}

const getShipImo = () => {
  return reportDetail.value?.logisticsList?.[0]?.imo || ''
}

const getShipMmsi = () => {
  return reportDetail.value?.logisticsList?.[0]?.mmsi || ''
}

const getShipCallsign = () => {
  return reportDetail.value?.logisticsList?.[0]?.callsign || ''
}

const getShipFlag = () => {
  return reportDetail.value?.logisticsList?.[0]?.flag || ''
}

const getShipGt = () => {
  return reportDetail.value?.logisticsList?.[0]?.gt || ''
}

// 船舶公司信息获取函数
const getShipOwner = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipOwner || ''
}

const getShipOwnerCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipOwnerCountry || ''
}

const getShipManager = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipManager || ''
}

const getShipManagerCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipManagerCountry || ''
}

const getShipOperator = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipOperator || ''
}

const getShipOperatorCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.shipOperatorCountry || ''
}

const getDocCompany = () => {
  return reportDetail.value?.logisticsList?.[0]?.docCompany || ''
}

const getDocCompanyCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.docCompanyCountry || ''
}

const getDocImo = () => {
  return reportDetail.value?.logisticsList?.[0]?.docImo || ''
}

const getShipRegisterCompany = () => {
  return reportDetail.value?.logisticsList?.[0]?.registerCompany || ''
}

const getShipRegisterCompanyCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.registerCompanyCountry || ''
}

const getShipRegisterImo = () => {
  return reportDetail.value?.logisticsList?.[0]?.registerImo || ''
}

const getTechManager = () => {
  return reportDetail.value?.logisticsList?.[0]?.techManager || ''
}

const getTechManagerCountry = () => {
  return reportDetail.value?.logisticsList?.[0]?.techManagerCountry || ''
}

const getShipCharterer = () => {
  return reportDetail.value?.logisticsList?.[0]?.charterer || ''
}

// 位置筛查信息获取函数
const getDeparturePortCode = () => {
  // 优先从 locationList 中查找离境口岸信息
  if (reportDetail.value?.locationList) {
    const departurePort = reportDetail.value.locationList.find(
      (item) => item.itemName === '离境口岸',
    )
    if (departurePort) {
      return departurePort.caccPortCode || departurePort.itemValue || ''
    }
  }
  return reportDetail.value?.retrieveInfo?.departurePortCode || ''
}

const getDestinationPortCode = () => {
  // 优先从 locationList 中查找指运港信息
  if (reportDetail.value?.locationList) {
    const destinationPort = reportDetail.value.locationList.find(
      (item) => item.itemName === '指运港',
    )
    if (destinationPort) {
      return destinationPort.caccPortCode || destinationPort.itemValue || ''
    }
  }
  return reportDetail.value?.retrieveInfo?.destinationPortCode || ''
}

// 图片加载错误处理
const imageLoadError = ref(false)
const onImageError = () => {
  imageLoadError.value = true
}

// 更新页面数据的函数
const updatePageData = () => {
  if (!reportDetail.value) return

  // 更新商品信息
  if (reportDetail.value.commodityList) {
    goodsInfo.value = reportDetail.value.commodityList.map((item, index) => ({
      checked: index === 0,
      name: item.itemValue || '',
      category: item.itemCategoryDes || '',
      code: item.itemCode || '',
      description: item.itemDesCn || item.itemDes || '',
      publishCountry: item.countryName || '',
      controlList: item.keywordShortNameCn || '',
      searchCode: item.searchWordsCn || '',
      customsCode: item.taricCode || '',
      controlCountry: item.restrictedRegionName || '',
      tariffCode: item.taricCode || '',
      chemicalCode: item.casCode || '',
      supervisionGroup: item.matchScore || '',
    }))
  }

  // 更新交易方信息 - 使用trades数组
  if (reportDetail.value.trades && reportDetail.value.trades.length > 0) {
    // 从trades数组中提取交易方信息
    const tradeMap = {}
    reportDetail.value.trades.forEach((trade) => {
      tradeMap[trade.key] = trade.value
    })

    traderInfo.value = {
      domesticCountry: tradeMap['境内发货人'] || '',
      locationType: tradeMap['境外收货人'] || '',
      entityName: tradeMap['申报单位'] || '',
      entityAlias: reportDetail.value.counterpartyList?.[0]?.matchScore || '非敏感名单',
      domesticProvince: '',
      cityName: '',
      unCode: '',
      iataCode: '',
      icaoCode: '',
    }
  }

  // 更新位置信息
  if (reportDetail.value.locationList && reportDetail.value.locationList.length > 0) {
    const location = reportDetail.value.locationList[0]
    locationInfo.value = {
      country: location.countryName || '',
      province: location.province || '',
      city: location.city || '',
      address: location.locationName || location.itemValue || '',
      postalCode: location.caccPortCode || '',
      longitude: '',
      latitude: '',
    }
  }

  // 更新船舶信息
  if (reportDetail.value.logisticsList && reportDetail.value.logisticsList.length > 0) {
    const ship = reportDetail.value.logisticsList[0]
    shipInfo.value = {
      name: ship.shipname || ship.itemValue || '',
      buildYear: ship.builddate || '',
      type: ship.shiptype || '',
      imoNumber: ship.imo || '',
      permit: ship.callsign || '',
      proposal: ship.mmsi || '',
      isControlled: ship.isSan ? '是' : '否',
      sanctionTime: ship.sanDate || '',
      sanctionCountry: ship.sanPublishCountry || '',
      sanctionReason: ship.sanReason || '',
      typeList: ship.restrictionNames || '',
    }
  }
}

// 获取船舶筛查结果
const getShipScreeningResult = () => {
  // 检查物流信息中的船舶数据
  if (reportDetail.value?.logisticsList && reportDetail.value.logisticsList.length > 0) {
    const ship = reportDetail.value.logisticsList[0]

    // 检查是否被制裁
    if (ship.isSan) {
      return '在敏感信息名单中'
    }

    // 检查是否有限制信息
    if (ship.restrictionNames) {
      return '有限制信息'
    }
  }

  // 默认返回不在敏感信息名单中
  return '不在敏感<br/>信息名单中'
}

// 获取海关编号筛查结果
const getCustomsCodeResult = () => {
  // 海关编号一般不进行敏感信息筛查，主要用于单据识别
  return ''
}

// 获取申报日期筛查结果
const getDeclareDateResult = () => {
  // 申报日期一般不进行敏感信息筛查
  return ''
}

// 获取提运单号筛查结果
const getBillOfLadingResult = () => {
  // 提运单号一般不进行敏感信息筛查
  return ''
}

// 获取运输方式筛查结果
const getTransportModeResult = () => {
  // 运输方式一般不进行敏感信息筛查
  return ''
}

// 获取航次号筛查结果
const getVoyageResult = () => {
  // 航次号一般不单独进行敏感信息筛查
  return ''
}

// 获取集装箱号筛查结果
const getContainerResult = () => {
  // 集装箱号一般不单独进行敏感信息筛查
  return ''
}
</script>
<style lang="scss" scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

.custom-checkbox {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: rgb(255 255 255 / 100%);
  border: 2px solid rgb(204 204 204 / 100%);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.custom-checkbox.selected {
  background-color: rgb(37 99 235 / 100%);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M3 8l3 3l7-7'/%3e%3c/svg%3e");
  border: 2px solid rgb(37 99 235 / 100%);
}
/* scroll-view样式 */
.scroll-container {
  width: 100%;
  height: 100%;
}
/* 确保scroll-view有合适的高度 */
:deep(.uni-scroll-view) {
  height: 100% !important;
}

:deep(.uni-scroll-view-content) {
  min-height: 100%;
}
/* 底部工具栏 */
.bottom-toolbar {
  width: 750rpx;
  height: 180rpx;
  padding-bottom: 35rpx;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
</style>
