import { getTagLabel, type Tag } from '@/lib/types';

interface MemorialCardProps {
  title: string;
  name: string;
  description: string;
  tags?: Tag[];
}

export default function MemorialCard({ title, name, description, tags = [] }: MemorialCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {(tags && tags.length > 0) && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {getTagLabel(tag)}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">永垂不朽</span>
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
