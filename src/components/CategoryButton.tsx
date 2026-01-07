import type { LinkCategoryWithCount, CategoryIconName } from "@constants/links";
import type { LucideIcon } from "lucide-react";
import { Bug, Cloud, Code, Coins, Frame, Globe, Music, Palette, Wrench } from "lucide-react";

const ICON_COMPONENTS: Record<CategoryIconName, LucideIcon> = {
  Bug,
  Cloud,
  Code,
  Coins,
  Frame,
  Globe,
  Music,
  Palette,
  Wrench,
};

interface Props {
  category: LinkCategoryWithCount;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryButton({ category, selected, onClick }: Props) {
  const Icon = category.iconName ? ICON_COMPONENTS[category.iconName] : null;

  return (
    <button
      onClick={onClick}
      className={`w-full rounded border p-3 text-left transition
        ${selected
          ? 'border-skin-accent bg-skin-accent text-skin-inverted'
          : 'border-skin-line bg-skin-card text-skin-base hover:border-skin-accent hover:bg-skin-card-muted'
        }
        focus-outline`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon ? (
            <Icon className="size-5" aria-hidden="true" />
          ) : (
            <span className="size-5" aria-hidden="true" />
          )}
          <span className="font-medium">{category.name}</span>
        </div>
        <span className={`text-sm ${selected ? 'text-skin-inverted opacity-80' : 'text-skin-base opacity-60'}`}>
          {category.count}
        </span>
      </div>
    </button>
  );
}
