import { useState } from 'react';
import type { LinkItem } from '@/types';
import type { LinkCategoryWithCount } from '@constants/links';
import CategoryButton from './CategoryButton';
import LinkCard from './LinkCard';

interface Props {
  links: LinkItem[];
  categories: LinkCategoryWithCount[];
}

export default function LinkManager({ links, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLinks = selectedCategory === 'all'
    ? links
    : links.filter(link => link.category === selectedCategory);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Desktop Sidebar */}
        <aside className="hidden w-60 shrink-0 sm:block">
          <div className="space-y-2">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                selected={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Mobile Category Dropdown */}
          <div className="mb-6 sm:hidden">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded border border-skin-line bg-skin-card
                p-3 text-skin-base focus-outline"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {`${cat.name} (${cat.count})`}
                </option>
              ))}
            </select>
          </div>

          {/* Links Grid */}
          {filteredLinks.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredLinks.map(link => (
                <LinkCard key={link.id} link={link} />
              ))}
            </div>
          ) : (
            <p className="text-center text-skin-base opacity-70">
              No links in this category yet.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
