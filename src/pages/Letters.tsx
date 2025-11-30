import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import SectionTitle from '../components/ui/SectionTitle';
import { Mail, X, Heart, Plus, Trash2, Edit2, Save } from 'lucide-react';
import { useLetters, type Letter } from '../hooks/useLetters';

export default function Letters() {
  const { letters, addLetter, updateLetter, deleteLetter } = useLetters();
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    preview: '',
    content: ''
  });

  const checkAuth = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      setPendingAction(() => action);
      setShowAuthModal(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PIN rahasia: 210322
    if (authPin === '210322') {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setAuthPin('');
      setAuthError(false);
      if (pendingAction) {
        pendingAction();
        setPendingAction(null);
      }
    } else {
      setAuthError(true);
    }
  };

  const handleEdit = (letter: Letter, e: React.MouseEvent) => {
    e.stopPropagation();
    checkAuth(() => {
      setFormData({
        title: letter.title,
        date: letter.date,
        preview: letter.preview,
        content: letter.content
      });
      setEditingId(letter.id);
      setIsEditing(true);
    });
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    checkAuth(() => {
      if (window.confirm('Apakah kamu yakin ingin menghapus surat ini?')) {
        deleteLetter(id);
        if (selectedLetter?.id === id) setSelectedLetter(null);
      }
    });
  };

  const handleAddNew = () => {
    checkAuth(() => {
      setFormData({
        title: '',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        preview: '',
        content: ''
      });
      setEditingId(null);
      setIsEditing(true);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateLetter(editingId, formData);
    } else {
      addLetter(formData);
    }
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="relative">
          <SectionTitle
            title="Surat Cinta"
            subtitle="Kata-kata dari hatiku untukmu."
            className="mb-16"
          />
          <button
            onClick={handleAddNew}
            className="absolute top-0 right-0 md:top-4 md:right-4 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            title="Tulis Surat Baru"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline font-medium">Tulis Surat</span>
          </button>
        </div>

        {/* Grid Surat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {letters.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
              onClick={() => setSelectedLetter(letter)}
              className="bg-white p-8 rounded-xl shadow-sm border border-primary/10 cursor-pointer relative overflow-hidden group"
            >
              {/* Dekorasi Amplop */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-primary/20" />
              
              <div className="flex justify-between items-start mb-4">
                <Mail className="w-8 h-8 text-primary" />
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleEdit(letter, e)}
                    className="p-1.5 hover:bg-primary/10 rounded-full text-primary transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(letter.id, e)}
                    className="p-1.5 hover:bg-red-50 rounded-full text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif font-bold text-xl mb-2 line-clamp-1">{letter.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">{letter.date}</p>
              <p className="text-sm text-foreground/60 italic line-clamp-3">"{letter.preview}"</p>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-primary font-medium">Baca selengkapnya &rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Form Edit/Add */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsEditing(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-lg p-6 rounded-xl shadow-2xl relative"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-serif text-primary">
                    {editingId ? 'Edit Surat' : 'Tulis Surat Baru'}
                  </h3>
                  <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Judul surat..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Contoh: 24 Januari 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview (Singkat)</label>
                    <textarea
                      required
                      value={formData.preview}
                      onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-20 resize-none"
                      placeholder="Kutipan singkat untuk di kartu..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Isi Surat</label>
                    <textarea
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all h-40"
                      placeholder="Tulis isi hatimu di sini..."
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Simpan
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal untuk Membaca Surat */}
        <AnimatePresence>
          {selectedLetter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              onClick={() => setSelectedLetter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#fffbf0] w-full max-w-lg p-8 md:p-12 rounded-sm shadow-2xl relative max-h-[90vh] overflow-y-auto"
                style={{
                  backgroundImage: 'linear-gradient(#e1e1e1 1px, transparent 1px)',
                  backgroundSize: '100% 2rem',
                  lineHeight: '2rem',
                }}
              >
                {/* Tombol Tutup */}
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="absolute top-4 right-4 text-foreground/50 hover:text-foreground z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Isi Surat */}
                <div className="font-serif text-lg md:text-xl text-foreground/80">
                  <div className="flex justify-between items-baseline mb-8 border-b border-foreground/10 pb-4">
                    <h2 className="font-bold text-2xl text-primary">{selectedLetter.title}</h2>
                    <span className="text-sm text-muted-foreground">{selectedLetter.date}</span>
                  </div>
                  
                  <p className="whitespace-pre-wrap mb-8">
                    {selectedLetter.content}
                  </p>

                  <div className="flex justify-end mt-8">
                    <div className="flex flex-col items-center">
                      <span className="font-cursive text-xl">Dengan penuh cinta,</span>
                      <Heart className="w-4 h-4 fill-primary text-primary mt-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Modal Auth */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowAuthModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                  Hanya untuk Kita
                </h3>
                <p className="text-gray-500 mb-6">
                  Masukkan PIN rahasia untuk menulis surat.
                </p>

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      autoFocus
                      maxLength={6}
                      value={authPin}
                      onChange={(e) => {
                        setAuthPin(e.target.value);
                        setAuthError(false);
                      }}
                      className={`w-full px-4 py-3 text-center text-2xl tracking-[0.5em] font-bold rounded-xl border-2 outline-none transition-all ${
                        authError 
                          ? 'border-red-300 bg-red-50 text-red-500 focus:border-red-500' 
                          : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10'
                      }`}
                      placeholder="••••"
                    />
                    {authError && (
                      <p className="text-red-500 text-sm mt-2 font-medium">
                        PIN salah, coba lagi ya sayang.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-transform active:scale-95"
                  >
                    Buka Akses
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
