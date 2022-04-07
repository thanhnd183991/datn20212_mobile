import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { detectURLs, getSites, siteData } from "../../utils/media/hyperlink";
import Layout from "../../constants/Layout";
import Hyperlink from "react-native-hyperlink";

const blue = "#3777f0";
const grey = "lightgrey";
const ContentHyperlink = ({
  contentText,
  styleMessage,
  stylePost,
  styleComment,
}) => {
  const arrayHyperlink = detectURLs(contentText);
  const [websites, setWebsites] = React.useState([]);
  console.log(websites);
  useEffect(() => {
    getSites([...arrayHyperlink])
      .processSites()
      .then((sites) => {
        const rs = [];
        for (let i in sites) {
          let site = sites[i];
          let data = siteData(site);
          data.getMetaTags();
          data.cleanTags();
          rs.push({ ...data.preview, linkUrl: arrayHyperlink[i] });
        }
        setWebsites(rs);
      });
  }, []);
  return (
    <View>
      <Hyperlink
        onPress={(url, _) => Linking.openURL(url)}
        linkStyle={{ textDecorationLine: "underline" }}
      >
        <Text
          style={
            styleMessage
              ? {
                  ...styleMessage,
                }
              : stylePost
              ? { ...stylePost }
              : styleComment
              ? { ...styleComment }
              : {}
          }
        >
          {contentText}
        </Text>
      </Hyperlink>
      {websites &&
        websites.length > 0 &&
        websites.map((item, index) => (
          <Pressable
            onPress={() => Linking.openURL(item.linkUrl)}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              borderColor: "lightgray",
              marginTop: 3,
            }}
            key={index}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: Layout.window.width * 0.4,
                resizeMode: "cover",
              }}
            />
            <Text style={{ textDecorationLine: "underline" }}>
              {item?.title}
            </Text>
            {item.description && (
              <Text numberOfLines={2} style={{ color: "gray", fontSize: 14 }}>
                {item?.description}
              </Text>
            )}
          </Pressable>
        ))}
    </View>
  );
};

export default ContentHyperlink;
