"use client";

import React, { useEffect, useState } from "react";
import { Menu, Checkbox, Collapse, Divider, Radio } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

const FilterComponent = ({ categoryItem }) => {
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  //   const updatedSearchParams = new URLSearchParams(searchParams.toString());

  // Initialize checkedItems and selectedRadio from URL parameters
  useEffect(() => {
    const categoryIds = searchParams.getAll("categoryId");
    setCheckedItems(categoryIds); // Set initial checked categories

    const sortBy = searchParams.get("sortBy");
    if (sortBy) {
      setSelectedRadio(sortBy); // Set initial selected radio option
    }
  }, [searchParams]);

  // handle change checkbox value
  const handleCheckboxChange = (key, e) => {
    const isChecked = e.target.checked;

    setCheckedItems((prev) => {
      let newCheckedItems;
      if (isChecked) {
        // Add the checked item
        newCheckedItems = [...prev, key];
      } else {
        // Remove the unchecked item
        newCheckedItems = prev.filter((item) => item !== key);
      }

      // Update the URL parameters based on all checked items
      const updatedSearchParams = new URLSearchParams(router.query);
      updatedSearchParams.delete("categoryId"); // Clear previous categoryId params
      newCheckedItems.forEach((item) => {
        updatedSearchParams.append("categoryId", item); // Add each checked item
      });

      // Preserve the selected radio item in URL params
      if (selectedRadio) {
        updatedSearchParams.set("sortBy", selectedRadio);
      }

      // Update the URL
      router.push(`/forum?${updatedSearchParams.toString()}`);

      return newCheckedItems;
    });
  };

  // Radio change handler
  const handleRadioChange = (e) => {
    const newSelectedRadio = e.target.value;
    setSelectedRadio(newSelectedRadio);

    // Update the URL parameters with the new radio selection
    const updatedSearchParams = new URLSearchParams(router.query);
    updatedSearchParams.set("sortBy", newSelectedRadio);

    // Add each checked item to the params if it exists
    checkedItems.forEach((item) => {
      updatedSearchParams.append("categoryId", item);
    });

    // Update the URL
    router.push(`/forum?${updatedSearchParams.toString()}`);
  };

  const sortByItems = [
    { key: "new to old", label: "New to Old" },
    { key: "old to new", label: "Old to New" },
    { key: "last activity", label: "Last Activity" },
    { key: "most liked", label: "Most Liked" },
    { key: "most comment", label: "Most Comment" },
  ];

  const items = [
    {
      key: "1",
      label: (
        <p className="font-normal text-base text-[#2A2A2A] whitespace-nowrap">{`Categories (${checkedItems.length})`}</p>
      ),
      children: (
        <Menu mode="inline" style={{ border: "none", padding: 0, margin: 0 }}>
          {categoryItem?.map((item) => (
            <Menu.Item
              key={item.key}
              style={{ border: "none", padding: 0, margin: 0, background: "transparent", height: "30px" }}
            >
              <Checkbox
                onChange={(e) => handleCheckboxChange(item.key, e)}
                checked={checkedItems.includes(item.key)}
                style={{
                  color: checkedItems.includes(item.key) ? "#248280" : "#4A4A4A",
                  fontWeight: 500,
                }}
              >
                {item.label}
              </Checkbox>
            </Menu.Item>
          ))}
        </Menu>
      ),
    },
    {
      key: "2",
      label: <p className="font-normal text-base text-[#2A2A2A]">Sort By</p>,
      children: (
        <Menu mode="inline" style={{ border: "none", padding: 0, margin: 0 }}>
          <Radio.Group onChange={handleRadioChange} value={selectedRadio}>
            {sortByItems.map((item) => (
              <Menu.Item
                key={item.key}
                style={{ border: "none", padding: 0, margin: 0, background: "transparent", height: "30px" }}
              >
                <Radio value={item.key}>{item.label}</Radio>
              </Menu.Item>
            ))}
          </Radio.Group>
        </Menu>
      ),
    },
  ];

  return (
    <div className="min-h-32">
      <div className="pb-4">
        <p className="font-semibold text-xl">Filter By</p>
      </div>

      <Divider style={{ padding: 0, margin: 0 }} />

      <div className="">
        <Collapse
          defaultActiveKey={["1", "2"]}
          className="border-none"
          style={{ border: "none", padding: 0, whiteSpaceCollapse: "none" }}
          expandIconPosition={"end"}
          ghost
          items={items}
        ></Collapse>
      </div>
    </div>
  );
};

export default FilterComponent;
