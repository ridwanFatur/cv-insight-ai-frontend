export default function ShowcaseBox() {
	return (
		<div className="w-full aspect-video rounded-2xl border border-white/7 bg-white/3 backdrop-blur-sm relative overflow-hidden">
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
			<div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-indigo-500/30 rounded-tl-2xl" />
			<div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-indigo-500/30 rounded-tr-2xl" />
			<div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-indigo-500/30 rounded-bl-2xl" />
			<div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-indigo-500/30 rounded-br-2xl" />
		</div>
	);
}