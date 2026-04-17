import { Colors, Typography } from "@/src/constants/styles";
import { systemFonts } from "@/src/constants/systemFont";
import { ContentBlock } from "@/src/types/baseListing";
import TableRenderer, { tableModel } from "@native-html/table-plugin";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { WebView } from "react-native-webview";

type RendererProps = {
  blocks: ContentBlock[];
  contentWidth: number;
};

const tagsStyles = {
  body: {
    fontFamily: Typography.family.regular,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textBody,
  },
  p: {
    marginTop: 0,
    marginBottom: 12,
    fontFamily: Typography.family.regular,
    fontSize: 12.5,
    lineHeight: 22,
    color: Colors.textBody,
  },
  h2: {
    marginTop: 0,
    marginBottom: 10,
    fontFamily: Typography.family.medium,
    fontSize: 15.5,
    lineHeight: 26,
    color: Colors.textHeading,
  },
  h3: {
    marginTop: 0,
    marginBottom: 8,
    fontFamily: Typography.family.medium,
    fontSize: 14.5,
    lineHeight: 24,
    color: Colors.textHeading,
  },
  li: {
    marginBottom: 6,
    fontFamily: Typography.family.regular,
    fontSize: 12.5,
    lineHeight: 22,
    color: Colors.textBody,
  },
  a: {
    color: Colors.textHighlight,
  },
};

const tableConfig = {
  tableStyleSpecs: {
    selectableText: true,
    fitContainerWidth: false,
    fitContainerHeight: false,
    cellPaddingEm: 0.8,
    fontSizePx: 14,
    rowsBorderWidthPx: 1,
    columnsBorderWidthPx: 1,
    outerBorderColor: "#E5E7EB",
    outerBorderWidthPx: 1,
    linkColor: Colors.textHighlight,
    fontFamily: Typography.family.regular,
    tdBorderColor: "#E5E7EB",
    thBorderColor: "#CBD5E1",
    thOddBackground: "#F8FAFC",
    thOddColor: Colors.textHeading,
    thEvenBackground: "#F8FAFC",
    thEvenColor: Colors.textHeading,
    trOddBackground: "#FFFFFF",
    trOddColor: Colors.textBody,
    trEvenBackground: "#F8FAFC",
    trEvenColor: Colors.textBody,
  },
  displayMode: "normal" as const,
  webViewProps: {
    nestedScrollEnabled: true,
    originWhitelist: ["*"],
  },
};

const renderBlock = (block: ContentBlock, contentWidth: number) => {
  const html = block.body_html || block.body_text || "";
  const isTableBlock = /<table/i.test(html);

  return (
    <View key={block.id} style={styles.blockContainer}>
      <View style={[isTableBlock ? styles.tableContainer : undefined]}>
        <RenderHtml
          contentWidth={contentWidth}
          source={{ html }}
          tagsStyles={tagsStyles}
          systemFonts={systemFonts}
          renderers={{ table: TableRenderer }}
          customHTMLElementModels={{ table: tableModel }}
          renderersProps={{ table: tableConfig }}
          WebView={WebView}
        />
      </View>

      {block.media && block.media.length > 0 ? (
        <View style={styles.mediaContainer}>
          {block.media
            .filter((item) => item.media.type === "image")
            .map((item) => (
              <View key={item.id} style={styles.mediaItem}>
                <Image
                  source={{ uri: item.media.src }}
                  style={styles.mediaImage}
                  contentFit="cover"
                  accessible
                  accessibilityLabel={item.media.alt || "Media content"}
                />
              </View>
            ))}
        </View>
      ) : null}
    </View>
  );
};

export default function Renderer({ blocks, contentWidth }: RendererProps) {
  return (
    <View style={styles.rendererContainer}>
      {blocks
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((block) => renderBlock(block, contentWidth))}
    </View>
  );
}

const styles = StyleSheet.create({
  rendererContainer: {
    width: "100%",
    gap: 12,
  },
  blockContainer: {
    gap: 20,
  },
  tableContainer: {
    backgroundColor: "#F8FAFC",
  },
  mediaContainer: {
    gap: 8,
  },
  mediaItem: {
    width: "100%",
    minHeight: 180,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Colors.overlay,
  },
  mediaImage: {
    width: "100%",
    height: 180,
  },
});
