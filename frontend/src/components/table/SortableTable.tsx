import React, { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./SortableTable.module.scss";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const sortTable = (
  header: { key: string; label: string },
  setSortHeader: Function,
  setSortOrder: Function,
  sortHeader: string,
  sortOrder: string
) => {
  // ""=no sorting, "asc"=ascending(по увеличению), "desc"= descending(по уменьшению)
  // "" -> "asc"
  // "asc" -> "desc"
  // "desc" -> "asc"
  // If columns changed, always use asc
  if (header.key != sortHeader) {
    setSortOrder("asc");
  }
  // If cloumns not changed, swap sort order
  else {
    if (sortOrder == "" || sortOrder == "desc") {
      setSortOrder("asc");
    } else if (sortOrder == "asc") {
      setSortOrder("desc");
    }
  }
  setSortHeader(header.key);
};

const setNewFilter = (
  event: FormEvent,
  header: { key: string; label: string },
  filter: any,
  setFilter: Function
) => {
  event.preventDefault();
  const inputTag: any = event.target;
  const value: string = inputTag.value;

  // copy current filter to not change the original filter
  let newFilter = { ...filter };
  newFilter[header.key] = value;
  setFilter(newFilter);
};

function getIntersectedKeys(o1: object, o2: object) {
  // filter in keys from object 1 when object 2 has it
  return Object.keys(o1).filter((k) => Object.hasOwn(o2, k));
}

function filterRow(row: Object, filter: Object | undefined): boolean {
  // do not process undefined or empty filter
  if (filter === undefined) {
    // filter in this row
    return true;
  }

  if (Object.keys(filter).length === 0) {
    return true;
  }

  // find intersected headers between filters and row
  const intersectedHeaders = getIntersectedKeys(row, filter);

  // check if all filters pass
  //      for every header...
  const allFiltersPassed = intersectedHeaders.every((header) => {
    // ...get row value
    const rowValue = Object.entries(row).find((kvp) => kvp[0] === header)![1];
    // ...get filter value
    const filterValue = Object.entries(filter).find(
      (kvp) => kvp[0] === header
    )![1];
    // ...compare if row value contains filter value case-insensitive
    const passedFilter = rowValue
      .toLowerCase()
      .includes(filterValue.toLowerCase());
    return passedFilter;
  });
  return allFiltersPassed;
}

const SortableTable: React.FC<SortableTableProps> = ({ headers, data }) => {
  const [filter, setFilter] = useState({});
  const [sortHeader, setSortHeader] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  return (
    <>
      <table className={styles.table}>
        {" "}
        {/* Use the styles here */}
        <thead>
          <tr>
            {headers.map((header) => (
              <th className={styles.header} key={header.key}>
                <div>{header.label}</div>
              </th>
            ))}
            <th className={styles.header}>Links</th>
          </tr>
          <tr>
            {headers.map((header) => (
              <th className={styles.header} key={header.key}>
                <div>
                  <input
                    type="text"
                    onInput={(e) => setNewFilter(e, header, filter, setFilter)}
                    className={styles.input}
                  />
                </div>
                <div>
                  <button
                    onClick={() =>
                      sortTable(
                        header,
                        setSortHeader,
                        setSortOrder,
                        sortHeader,
                        sortOrder
                      )
                    }
                  >
                    &gt;
                  </button>
                </div>
              </th>
            ))}
            {/* Empty cell for "Links" column without search bar */}
            <th className={styles.header}></th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((row) => filterRow(row, filter))
            .sort((row1, row2) => {
              // Rows are equal, sort order does not matter
              if (row1[sortHeader] === row2[sortHeader]) {
                return 0;
              }

              // If sort order is ascending
              if (sortOrder === "asc") {
                // compare them in the right order
                return row1[sortHeader] > row2[sortHeader] ? 1 : -1;
              }
              // If sort order is descending
              else {
                // compare them in reverse order
                return row1[sortHeader] > row2[sortHeader] ? -1 : 1;
              }
            })
            .map((row, i) => (
              <tr key={i}>
                {headers.map((header) => (
                  <td className={styles.header} key={header.key}>
                    {row[header.key]}
                  </td>
                ))}
                <td className={`${styles.header} ${styles.linkCell}`}>
                  <Link href={`/articles/${row.id}`}>
                    <button className={styles["view-article"]}>
                      View Article
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
export default SortableTable;
