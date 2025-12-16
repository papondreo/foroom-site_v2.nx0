<template>
  <div class="promo-block-container">
    <div v-if="fullBanner" class="block full">
      <nuxt-link :to="fullBanner.link">
        <picture>
          <source :srcset="fullBanner.webp" type="image/webp" />
          <img
            :src="fullBanner.jpg"
            :alt="fullBanner.alt"
            :title="fullBanner.title"
            loading="lazy"
            width="1200"
            height="400"
          />
        </picture>
      </nuxt-link>
    </div>

    <div v-else class="side-blocks">
      <div class="left-block">
        <div class="slider-wrapper" v-if="leftBanners.length">
          <nuxt-link :to="leftBanners[leftIndex].link" class="banner-link">
            <picture>
              <source :srcset="leftBanners[leftIndex].webp" type="image/webp" />
              <img
                :src="leftBanners[leftIndex].jpg"
                :alt="leftBanners[leftIndex].alt"
                :title="leftBanners[leftIndex].title"
                loading="lazy"
                width="590"
                height="400"
              />
            </picture>
          </nuxt-link>

          <button
            v-if="leftBanners.length > 1"
            class="nav prev"
            @click="leftPrev"
            aria-label="Предыдущий левый баннер"
          >‹</button>
          <button
            v-if="leftBanners.length > 1"
            class="nav next"
            @click="leftNext"
            aria-label="Следующий левый баннер"
          >›</button>
        </div>
      </div>

      <div class="right-block">
        <div class="slider-wrapper" v-if="rightBanners.length">
          <nuxt-link :to="rightBanners[rightIndex].link" class="banner-link">
            <picture>
              <source :srcset="rightBanners[rightIndex].webp" type="image/webp" />
              <img
                :src="rightBanners[rightIndex].jpg"
                :alt="rightBanners[rightIndex].alt"
                :title="rightBanners[rightIndex].title"
                loading="lazy"
                width="590"
                height="400"
              />
            </picture>
          </nuxt-link>

          <button
            v-if="rightBanners.length > 1"
            class="nav prev"
            @click="rightPrev"
            aria-label="Предыдущий правый баннер"
          >‹</button>
          <button
            v-if="rightBanners.length > 1"
            class="nav next"
            @click="rightNext"
            aria-label="Следующий правый баннер"
          >›</button>
        </div>
      </div>
    </div>

    <div v-if="!banners.length" class="placeholder">
      <nuxt-link to="/actions">
        <img
          src="/img-new/sale_points.jpg"
          alt="Акция: скидки и предложения"
          title="Перейти к акциям"
          width="1200"
          height="400"
          loading="lazy"
        />
      </nuxt-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { actionsStore } from "@/utils/store-accessor";

type BannerItem = {
  webp: string;
  jpg: string;
  alt: string;
  title: string;
  position: "full" | "left" | "right" | string;
  link: string;
};

@Component
export default class PromoBlock extends Vue {
  banners: BannerItem[] = [];
  leftIndex = 0;
  rightIndex = 0;
  private leftInterval: number | null = null;
  private rightInterval: number | null = null;

  private safeName(v: string): string {
    return String(v).replace(/["'<>]/g, "").replace(/\s+/g, " ").trim();
  }
  private safeContent(v: string): string {
    return String(v).replace(/<[^>]*>/g, "").replace(/["']/g, "").replace(/\s+/g, " ").trim();
  }
  private hash(s: string): string {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
    return (h >>> 0).toString(36);
  }
  private refreshHead() { this.$nextTick(() => this.$meta().refresh()); }


  head(): any {
    const scripts = this.ldScripts;
    const byId = scripts.reduce((acc: Record<string, string[]>, s: any) => {
      if (s.hid) acc[s.hid] = ["innerHTML"];
      return acc;
    }, {});
    return {
      title: this.metaTitle,
      meta: this.metaTags,
      link: [{ hid: "canonical", rel: "canonical", href: this.canonicalUrl }],
      script: scripts,
      __dangerouslyDisableSanitizersByTagID: byId
    };
  }

  get currentLeft(): BannerItem | null {
    return this.leftBanners.length ? this.leftBanners[this.leftIndex % this.leftBanners.length] : null;
  }
  get currentRight(): BannerItem | null {
    return this.rightBanners.length ? this.rightBanners[this.rightIndex % this.rightBanners.length] : null;
  }
  get visibleTargets(): BannerItem[] {
    if (this.fullBanner) return [this.fullBanner];
    return [this.currentLeft, this.currentRight].filter(Boolean) as BannerItem[];
  }


  get primaryBanner(): BannerItem | null {
    return this.fullBanner || this.leftBanners[0] || this.rightBanners[0] || null;
  }
  get metaTitle(): string {
    return (this.primaryBanner?.title || "Акции в Foroom").trim();
  }
  get metaDescription(): string {
    return (this.primaryBanner?.alt || "Скидки и спецпредложения Foroom").trim();
  }
  get canonicalUrl(): string {
    return this.primaryBanner?.link || "https://www.foroom.ru/promo";
  }
  get metaImage(): string {
    return (this.primaryBanner?.webp || this.primaryBanner?.jpg) || "https://www.foroom.ru/img/banner.webp";
  }


  get metaTags() {
    const title = this.safeName(this.metaTitle);
    const descMain = this.safeContent(this.metaDescription);
    const url = this.canonicalUrl;

    const base = [
      { hid: "description", name: "description", content: descMain },
      { hid: "og:type", property: "og:type", content: "website" },
      { hid: "og:title", property: "og:title", content: title },
      { hid: "og:description", property: "og:description", content: descMain },
      { hid: "og:url", property: "og:url", content: url }
    ];


    const images = this.visibleTargets.flatMap((b) => {
      const img = b.webp || b.jpg;
      const alt = this.safeContent(b.alt || b.title || "Акция");
      const id = this.hash(`${b.position}:${b.link}:${img}`);
      return [
        { hid: `og:image:${id}`, property: "og:image", content: img },
        { hid: `og:image:alt:${id}`, property: "og:image:alt", content: alt }
      ];
    });

    return [...base, ...images];
  }


  get ldScripts() {
    const items = this.visibleTargets.map((b) => ({
      "@type": "CreativeWork",
      "name": this.safeName(b.title || "Акция"),
      "url": b.link,
      "image": b.webp || b.jpg,
      "description": this.safeContent(b.alt || "")
    }));

    const payload = items.length === 1
      ? { "@context": "https://schema.org", ...items[0] }
      : { "@context": "https://schema.org", "@graph": items };

    return [{
      hid: "ld-banners",
      type: "application/ld+json",
      innerHTML: JSON.stringify(payload)
    }];
  }


  private isNullDate(v: any): boolean { return !v || v === "0000-00-00 00:00:00"; }
  private parseDateSafe(v: any): Date | null {
    if (this.isNullDate(v)) return null;
    const str = String(v).trim();
    if (/^\d+$/.test(str)) {
      const ts = parseInt(str, 10);
      const d = new Date(ts);
      return isNaN(d.getTime()) ? null : d;
    }
    const iso = str.includes("T") ? str : str.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d.getTime()) ? null : d;
  }
  private isActiveNow(a: any, now: Date): boolean {
    const start = this.parseDateSafe(a.startAt);
    const end = this.parseDateSafe(a.endAt);
    if (start && start > now) return false;
    if (end && end <= now) return false;
    return true;
  }
  private collectBanners(): BannerItem[] {
    const actions = actionsStore.currentActionInfoGetter || [];
    const now = new Date();
    return (actions as any[])
      .filter((a) => a.position)
      .filter((a) => Number(a.public) !== 0)
      .filter((a) => this.isActiveNow(a, now))
      .map((a) => ({
        webp: `https://www.foroom.ru/img/images/nf_foroom/actions/${a.image}.webp`,
        jpg:  `https://www.foroom.ru/img/images/nf_foroom/actions/${a.image}.jpg`,
        alt: a.alt,
        title: a.title,
        position: a.position,
        link: a.link
      }));
  }


  mounted() {
    this.loadBanners();
    if (this.leftBanners.length > 1) this.leftInterval = window.setInterval(() => this.leftNext(), 5000);
    if (this.rightBanners.length > 1) this.rightInterval = window.setInterval(() => this.rightNext(), 5000);
  }
  beforeDestroy() {
    if (this.leftInterval) clearInterval(this.leftInterval);
    if (this.rightInterval) clearInterval(this.rightInterval);
  }

  loadBanners() { this.banners = this.collectBanners(); }

  @Watch("banners", { deep: true })
  onBannersChange() { this.refreshHead(); }


  get fullBanner() { return this.banners.find((b) => b.position === "full") || null; }
  get leftBanners() { return this.banners.filter((b) => b.position === "left"); }
  get rightBanners() { return this.banners.filter((b) => b.position === "right"); }


  leftPrev() { if (!this.leftBanners.length || this.fullBanner) return;
    this.leftIndex = (this.leftIndex - 1 + this.leftBanners.length) % this.leftBanners.length; this.refreshHead(); }
  leftNext() { if (!this.leftBanners.length || this.fullBanner) return;
    this.leftIndex = (this.leftIndex + 1) % this.leftBanners.length; this.refreshHead(); }
  rightPrev() { if (!this.rightBanners.length || this.fullBanner) return;
    this.rightIndex = (this.rightIndex - 1 + this.rightBanners.length) % this.rightBanners.length; this.refreshHead(); }
  rightNext() { if (!this.rightBanners.length || this.fullBanner) return;
    this.rightIndex = (this.rightIndex + 1) % this.rightBanners.length; this.refreshHead(); }
}
</script>


<style scoped lang="scss">
.promo-block-container {
  display: flex;
  max-width: 1500px;
  margin-bottom: 24px;
  gap: 16px;
  position: relative;
  min-height: 400px;

  .block {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    background: #f5f5f8;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      display: block;
    }
  }

  .full {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 10;

    picture,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

.side-blocks {
  display: flex;
  width: 100%;
  gap: 16px;

  .left-block,
  .right-block {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
  }

  .left-block { flex: 2 1 0; }  
  .right-block { flex: 1 1 0; } 

  .slider-wrapper {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;

    picture,
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 10px;
    }
  }
}


  .placeholder {
    width: 100%;

    img {
      border-radius: 8px;
      width: 100%;
      height: 400px;
      object-fit: cover;
      display: block;
    }
  }

  .nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    font-size: 2rem;
    line-height: 1;
    padding: 0 12px;
    cursor: pointer;
    border-radius: 4px;
    user-select: none;
    z-index: 20;
  }

  .nav.prev {
    left: 8px;
  }

  .nav.next {
    right: 8px;
  }
}


@media (max-width: 768px) {
  .promo-block-container {
    flex-direction: column;
    min-height: auto;

    .side-blocks {
      flex-direction: column;

      .left-block,
      .right-block {
        height: 200px;
      }

      .slider-wrapper {
        height: 200px;

        picture,
        img {
          height: 100%;
        }
      }
    }

    .full {
      position: relative;
      height: 200px;
      z-index: auto;

      picture,
      img {
        height: 100%;
      }
    }

    .placeholder img {
      height: 200px;
    }
  }
}
</style>


