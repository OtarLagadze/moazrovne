"use client"

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import classes from "@/components/filterableList/FilterableList.module.css";
import { Pagination } from "@/components/pagination/Pagination";

const Filter = dynamic(() => import("@/components/ui/filter/Filter"), { ssr: false });

export default function FilterableList({ searchParams, data, itemsPerPage, filters, RenderComponent }) {
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState({});

  const currentPage = searchParams.page && Number(searchParams.page) > 0 ? Number(searchParams.page) : 1;

  const handleFilterChange = (key) => (value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    const params = new URLSearchParams(window.location.search);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const filteredData = useMemo(() => {
    return data.filter((problem) => {
      return filters.every(({ key }) => {
        const selectedValues = (selectedFilters[key] ?? []).map((item) => item.value);
        if (selectedValues.length === 0) return true;

        if (key === "grade") {
          return selectedValues.some((grade) => problem.grade.from <= grade && grade <= problem.grade.to);
        }
        return selectedValues.some((value) => problem.tags.includes(value));
      });
    });
  }, [data, selectedFilters, filters]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  return (
    <>
      <div className={classes.filterWrapper}>
        {filters.map(({ key, options, placeholder }) => (
          <Filter key={key} options={options} placeholder={placeholder} onChange={handleFilterChange(key)} />
        ))}
      </div>

      <div className={classes.itemsWrapper}>
        {paginatedData.length === 0 ? 
          (
            <p className={classes.noItemText}>მონაცემები არ მოიძებნა</p>
          ) : (
            paginatedData.map((item, index) => (
              <RenderComponent key={'RenderComponent' + index} data={item}/>
            ))
          )
        }
      </div>

      <Pagination activePage={currentPage} totalItems={filteredData.length} itemsPerPage={itemsPerPage} />
    </>
  );
}
