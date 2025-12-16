export default {
  install(Vue, options) {
    Vue.prototype.$yandexMetrika = function() {
      const init = () => {
        if (!window.ym) {
          (function(m, e, t, r, i, k, a) {
            m[i] = m[i] || function() {
              (m[i].a = m[i].a || []).push(arguments);
            };
            m[i].l = 1 * new Date();
            k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
          })
          (window, document, "script", "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js", "ym");

          ym('31892916', "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
            trackHash: true,
            debug: true
          });

          this.$router.afterEach((to, from) => {
            ym('31892916', "hit", to.fullPath);
          });

          console.log("<---yM--->");
        }
      };

      return {
        init: init,
        reachGoal: (targetName = "", params = {}) => {
          if (!window.ym) {
            init();
          }
          ym('31892916', "reachGoal", targetName, params);
          console.log("yM goal ", targetName);
        },
        hit: (url = "", options = {}) => {
          if (!window.ym) {
            init();
          }
          ym('31892916', "hit", url, options);
        }
      };
    };
  }
};
