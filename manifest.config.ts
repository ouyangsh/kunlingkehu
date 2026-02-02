// manifest.config.ts
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import path from 'node:path'
import { loadEnv } from 'vite'

// 获取环境变量的范例
const env = loadEnv(process.env.NODE_ENV!, path.resolve(process.cwd(), 'env'))
// console.log('manifest.config.ts')
// console.log(env)
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_WX_APPID,
  VITE_APP_PUBLIC_BASE,
  VITE_FALLBACK_LOCALE,
} = env

export default defineManifestConfig({
  name: 'aileme',
  appid: VITE_UNI_APPID,
  description: '',
  versionName: '1.0.0',
  versionCode: '100',
  transformPx: false,
  locale: VITE_FALLBACK_LOCALE, // 'zh-Hans'
  h5: {
    router: {
      base: VITE_APP_PUBLIC_BASE,
    },
  },
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    /* 模块配置 */
    modules: {
      Push: {
        description: 'UniPush 2.0 推送模块',
      },
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        minSdkVersion: 30,
        targetSdkVersion: 30,
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.INTERNET"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
        ],
      },
      /* ios打包配置 */
      ios: {
        plist: {
          NSAppTransportSecurity: {
            NSAllowsArbitraryLoads: true,
          },
        },
      },
      /* SDK配置 */
      sdkConfigs: {
        push: {
          unipush: {
            version: '2',
          },
        },
      },
      /* 图标配置 */
      icons: {
        android: {
          hdpi: 'static/icons/android_hdpi.png',
          xhdpi: 'static/icons/android_xhdpi.png',
          xxhdpi: 'static/icons/android_xxhdpi.png',
          xxxhdpi: 'static/icons/android_xxxhdpi.png',
        },
        ios: {
          appstore: 'static/icons/ios_appstore_1024.png',
          ipad: {
            app: 'static/icons/ios_ipad_76_1x.png',
            'app@2x': 'static/icons/ios_ipad_76_2x.png',
            'notification': 'static/icons/ios_iphone_20_2x.png',
            'notification@2x': 'static/icons/ios_iphone_40_2x.png',
            'proapp@2x': 'static/icons/ios_ipad_83.5_2x.png',
            'settings': 'static/icons/ios_iphone_29_2x.png',
            'settings@2x': 'static/icons/ios_iphone_29_2x.png',
            'spotlight': 'static/icons/ios_iphone_40_2x.png',
            'spotlight@2x': 'static/icons/ios_iphone_40_2x.png',
          },
          iphone: {
            'app@2x': 'static/icons/ios_iphone_60_2x.png',
            'app@3x': 'static/icons/ios_iphone_60_3x.png',
            'notification@2x': 'static/icons/ios_iphone_20_2x.png',
            'notification@3x': 'static/icons/ios_iphone_20_3x.png',
            'settings@2x': 'static/icons/ios_iphone_29_2x.png',
            'settings@3x': 'static/icons/ios_iphone_29_3x.png',
            'spotlight@2x': 'static/icons/ios_iphone_40_2x.png',
            'spotlight@3x': 'static/icons/ios_iphone_40_3x.png',
          },
        },
      },
    },
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: VITE_WX_APPID,
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
    lazyCodeLoading: 'requiredComponents',
    // __usePrivacyCheck__: true,
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
})
