import React from 'react';

type AddCompanyFormProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  onReset: () => void;
  validationMessage?: string | null;
  isSearching: boolean;
};

const AddCompanyForm: React.FC<AddCompanyFormProps> = ({
  keyword,
  onKeywordChange,
  onSearch,
  onReset,
  validationMessage,
  isSearching
}) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <h3 className="text-lg text-white">기업 검색</h3>
      <p className="mt-2 text-sm text-slate-400">기업명 또는 영문명을 입력해 검색하세요. (2자 이상)</p>
      <div className="mt-6">
        <label className="flex flex-col gap-2 text-sm text-slate-300">
          검색 키워드
          <input
            type="text"
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-500 focus:border-white/30 focus:outline-none"
            placeholder="예: 삼성"
          />
        </label>
      </div>
      {validationMessage && (
        <p className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {validationMessage}
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSearch}
          disabled={isSearching}
          className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-900 disabled:cursor-not-allowed disabled:bg-white/40"
        >
          {isSearching ? '검색 중...' : 'Search'}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.3em] text-white hover:bg-white/10"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AddCompanyForm;
