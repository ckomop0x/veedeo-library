'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { fetchVideos, setQuery } from '@/redux/videosSlice';
import TextSearch from '@/components/ui/TextSearch/TextSearch';
import DateRange from '@/components/DateRange/DateRange';
import SelectInput from '@/components/ui/SelectInput/SelectInput';
import { SORT_BY, SORT_BY_OPTIONS } from '@/constants/sortOptions';
import { Button } from '@/components/ui/button';

const defaultFilters = {
  search: '',
  sortBy: SORT_BY.NEWEST,
  tags: '',
  startDate: '',
  endDate: '',
  page: 1,
};

export default function VideosSearch() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.videos);

  const [search, setSearch] = useState(query.search || defaultFilters.search);
  const [sortBy, setSortBy] = useState(query.sortBy || defaultFilters.sortBy);
  const [tagsInput, setTagsInput] = useState(
    Array.isArray(query?.tags) ? query.tags.join(', ') : defaultFilters.tags,
  );
  const [startDate, setStartDate] = useState(
    query.startDate || defaultFilters.startDate,
  );
  const [endDate, setEndDate] = useState(
    query.endDate || defaultFilters.endDate,
  );

  const handleApplyFilters = () => {
    const formattedTags = tagsInput
      ?.split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newFilters = {
      search: search?.trim() || '',
      sortBy,
      tags: formattedTags.length ? formattedTags : '',
      startDate: startDate || '',
      endDate: endDate || '',
      page: 1,
    };

    dispatch(setQuery(newFilters));
    dispatch(fetchVideos(newFilters));
  };

  const handleClearFilters = () => {
    setSearch('');
    setSortBy(SORT_BY.NEWEST);
    setTagsInput('');
    setStartDate('');
    setEndDate('');

    dispatch(setQuery(defaultFilters));
    dispatch(fetchVideos(defaultFilters));
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trimStart());
  };

  const onTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value.trimStart());
  };

  const onStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const onEndDateChange = (date: string) => {
    setEndDate(date);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleApplyFilters();
  };

  const onSortByChange = (value: string) => {
    setSortBy(value);
  };

  useEffect(() => {
    setSearch(prev => (prev !== query.search ? query.search || '' : prev));
    setSortBy(prev =>
      prev !== query.sortBy ? query.sortBy || SORT_BY.NEWEST : prev,
    );
    setTagsInput(prev =>
      Array.isArray(query?.tags) && query.tags.length
        ? query.tags.join(', ')
        : prev,
    );
    setStartDate(prev =>
      prev !== query.startDate ? query.startDate || '' : prev,
    );
    setEndDate(prev => (prev !== query.endDate ? query.endDate || '' : prev));
  }, [query]);

  return (
    <form className="flex flex-col gap-6 p-4" onSubmit={onSubmit}>
      <div className="flex flex-col md:flex-row gap-4">
        <TextSearch
          placeholder="Search videos..."
          value={search}
          onChange={onSearchChange}
          className="flex-1"
        />
        <SelectInput
          value={sortBy}
          onChange={onSortByChange}
          options={SORT_BY_OPTIONS}
          className="w-full md:w-40"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <TextSearch
          placeholder="Search tags..."
          className="flex-1"
          value={tagsInput}
          onChange={onTagsChange}
        />
        <DateRange
          onStartDateChange={onStartDateChange}
          startDate={startDate}
          onEndDateChange={onEndDateChange}
          endDate={endDate}
        />

        <div className="flex gap-2">
          <Button onClick={handleClearFilters} type="button" variant="outline">
            Clear
          </Button>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
