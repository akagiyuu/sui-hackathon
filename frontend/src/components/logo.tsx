import { Play } from 'lucide-react';

export function Logo() {
    return (
        <div className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center group-hover:bg-neutral-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Play className="w-4 h-4 text-neutral-900 fill-neutral-900 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-xl font-semibold text-white group-hover:text-neutral-200 transition-colors duration-300">
                Suitube
            </span>
        </div>
    );
}
