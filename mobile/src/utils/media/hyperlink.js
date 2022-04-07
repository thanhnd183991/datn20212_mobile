import axios from "axios";

// return array of hyperlink
export function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.match(urlRegex) || [];
}

export const getSites = (urls) => {
  let state = { urls, websites: [] };
  return Object.assign(
    state,
    processSites(state),
    getSiteAsString(),
    getBaseUrl()
  );
};

const getBaseUrl = () => ({
  getBaseUrl: (url) => `${url.split("/")[0]}//${url.split("/")[2]}`,
});

const getSiteAsString = () => ({
  getSiteAsString: (previewUrl) =>
    new Promise((resolve, reject) => {
      const url = `https://script.google.com/macros/s/AKfycbwoHNb0E51Rw7E1C20w1AE-3xUAWoJkzERTapvTcZp-ozvElMA/exec?url=${previewUrl}`;
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    }),
});

const processSites = (state) => ({
  processSites: () => {
    return new Promise((resolve, reject) => {
      const promises = [];
      const baseUrls = [];
      state.urls.forEach((url) => {
        const baseUrl = state.getBaseUrl(url);
        baseUrls.push(baseUrl);
        promises.push(state.getSiteAsString(url));
      });
      Promise.all(promises).then((values) => {
        const obj = values.reduce((arc, string, index) => {
          arc[index] = { string, url: baseUrls[index] };
          return arc;
        }, {});
        resolve((state.websites = obj));
      });
    });
  },
});

const generateCard = (data) => {
  console.log(data);
};

export const siteData = (site) => {
  let state = {
    site,
    tags: [],
    preview: {},
  };
  return Object.assign(
    state,
    getMetaTags(state),
    cleanTags(state),
    getTagContents(state),
    getTagProperty(state),
    getTagContent(state),
    getPossibleImageFromMetaTags(state),
    getAlternativeImageFromWebsite(state),
    getBaseUrl(state),
    getTitleTag(state)
  );
};

const getTitleTag = (state) => ({
  getTitleTag: () => {
    const title = /<title>(.*?)<\/title>/gi;
    const result = state.site.string;
    const titleText = result.match(title);
    if (titleText) {
      return titleText[0].replace("<title>", "").replace("</title>", "");
    }
    return "";
  },
});

const getAlternativeImageFromWebsite = (state) => ({
  getAlternativeImageFromWebsite: () => {
    let imageUrls = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|ico)/gi;
    let images = state.site.string.match(imageUrls);
    // Check for image urls such as png.
    if (images === null) {
      imageUrls = /([/|.|\w|\s|-])*\.(?:jpg|gif|png|ico)/gi;
      images = state.site.string.match(imageUrls);
    }
    let logos = [];
    if (images) {
      logos = images.filter((image) => {
        return (
          image.indexOf("logo") >= 0 ||
          image.indexOf("icon") >= 0 ||
          image.indexOf("apple-touch") >= 0
        );
      });
      if (logos.length === 0) {
        logos = images.filter((image) => {
          return (
            // image.indexOf(".ico") >= 0 ||
            image.indexOf(".jpg") >= 0 || image.indexOf(".png") >= 0
          );
        });
      }
      if (logos.length) {
        if (logos[0].indexOf("http") >= 0) {
          return logos[0];
        }
        if (logos[0].substring(0, 2) === "//") {
          return `https:${logos[0]}`;
        }
        if (logos[0].indexOf("http") === -1) {
          return `${state.site.url}${logos[0]}`;
        }

        return logos[0];
      }

      // Look for icon tags help in links tags.
    }

    const title = /<link(.*?)>/gi;
    const result = state.site.string;
    const linkTags = result.match(title);
    const resultTags = [];
    linkTags.forEach((link) => {
      if (link.indexOf("icon") >= 0) {
        let imageUrls = /(http(s?):)([/|.|\w|\s|-])*/gi;
        let foundLink = link.match(imageUrls);
        if (foundLink) {
          resultTags.push(foundLink[0]);
        }
      }
    });
    if (resultTags.length) {
      return resultTags[0];
    }

    // finally get the fabicon.

    return undefined;
  },
});

const getPossibleImageFromMetaTags = (state) => ({
  getPossibleImageFromMetaTags: (element) => {
    if (
      element.indexOf(".png") >= 0 ||
      element.indexOf(".jpg") >= 0 ||
      element.indexOf(".ico") >= 0
    ) {
      const url = `${state.url}${element.replace('content="', "").trim()}`;
      return url;
    }
  },
});

//Extract meta tahs
const getMetaTags = (state) => ({
  getMetaTags: () => {
    const urlRegex = /<meta(?: [^>]+)?>/gi;
    let metaTags = state.site.string.match(urlRegex);
    if (metaTags) {
      const tags = metaTags.map((tag) => {
        return tag
          .replace(/\/>/g, "")
          .replace(/[\n\r]/g, "")
          .replace(/<meta /, "");
      });
      return (state.tags = tags);
    }
    return (state.tags = []);
  },
});

const getTagProperty = () => ({
  getTagProperty: (element) => {
    const tags = ["description", "title", "image", "site_name"];
    let propName = element
      .replace('property="og:', "")
      .replace("property='og:", "")
      .replace('name="', "")
      .replace("name='", "");
    if (tags.indexOf(propName) >= 0) return propName;
  },
});

const cleanTags = (state) => ({
  cleanTags: () => {
    let preview = {};
    let prop;
    let content;
    let image = undefined;
    state.tags.forEach((tag, index) => {
      const contents = state.getTagContents(tag);
      if (contents) {
        contents.forEach((element) => {
          element.indexOf("content=") === -1
            ? (prop = state.getTagProperty(element))
            : (content = state.getTagContent(element));
          image = state.getPossibleImageFromMetaTags(element);
        });
        if (prop) preview[prop] = content;
      }
    });
    if (!preview.image) {
      preview.image = state.getAlternativeImageFromWebsite();
    }
    if (preview.title === undefined || preview.site_name === undefined) {
      preview.title = state.getTitleTag();
    }
    if (preview.title === undefined || preview.title === "") {
      preview.title = "Cool Website";
    }
    return (state.preview = preview);
  },
});

const getTagContent = () => ({
  getTagContent: (element) =>
    element.replace('content="', "").replace("content='", ""),
});

const getTagContents = (state) => ({
  getTagContents: (tag) => {
    const tagNames =
      /(name=".+?(?="))|(property=".+?(?="))|(content=".+?(?="))|(name='.+?(?='))|(property='.+?(?='))|(content='.+?(?='))/g;
    return tag.match(tagNames);
  },
});
