import React from "react";
import { ThemeClassNames } from "@docusaurus/theme-common";
import {
  useDoc, // @ts-ignore
} from "@docusaurus/theme-common/internal";
import EditThisPage from "@theme/EditThisPage";
import LastUpdated from "@theme/LastUpdated";
import TagsListInline from "@theme/TagsListInline";
import clsx from "clsx";
import styles from "./styles.module.css";

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm"
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow)}>
      {editUrl && <EditThisPage editUrl={editUrl} />}
      {(lastUpdatedAt || lastUpdatedBy) && (
        <LastUpdated
          lastUpdatedAt={lastUpdatedAt}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
      <div className={clsx(styles.lastUpdated)}></div>
    </div>
  );
}

export default function DocItemFooter() {
  const { metadata } = useDoc();
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
  } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
    >
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  );
}
