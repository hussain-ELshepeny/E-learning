import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = forwardRef(
    ({ value, onChange, onSearch, placeholder = "Search..." }, ref) => {

        const handleSubmit = (e) => {
            e.preventDefault();
            onSearch();
        };

        const handleClear = () => {
            onChange('');
            onSearch();
        };

        return (
            <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />

                    <input
                        ref={ref}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-10 py-2.5 bg-dark-surfaceDarker border border-dark-surfaceDarker text-white rounded-lg focus:outline-none focus:border-primary"
                    />

                    {value && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>
        );
    }
);

export default SearchBar;
