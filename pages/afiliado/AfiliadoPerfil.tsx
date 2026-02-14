import React, { useEffect, useState } from 'react';
import { afiliadoPortalService } from '../../services/afiliadoPortalService';
import { Afiliado } from '../../services/afiliadosService';
import { Save, Loader2, CheckCircle } from 'lucide-react';

export function AfiliadoPerfil() {
    const [affiliate, setAffiliate] = useState<Afiliado | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        pix_tipo: 'cpf',
        pix_chave: '',
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const profile = await afiliadoPortalService.getMyProfile();
            if (profile) {
                setAffiliate(profile);
                setFormData({
                    nome: profile.nome || '',
                    telefone: profile.telefone || '',
                    pix_tipo: profile.pix_tipo || 'cpf',
                    pix_chave: profile.pix_chave || '',
                });
            }
        } catch (err) {
            console.error('Erro ao carregar perfil:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSaved(false);

        try {
            await afiliadoPortalService.updateMyProfile({
                nome: formData.nome,
                telefone: formData.telefone,
                pix_tipo: formData.pix_tipo,
                pix_chave: formData.pix_chave,
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err: any) {
            setError(err.message || 'Erro ao salvar perfil.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!affiliate) {
        return <div className="text-center text-gray-500 py-20">Perfil não encontrado.</div>;
    }

    const inputClass = "mt-1 block w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition";
    const selectClass = "mt-1 block w-full rounded-xl border border-gray-300 bg-white text-gray-900 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition";
    const labelClass = "block text-sm font-semibold text-gray-700";

    return (
        <div className="max-w-3xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
                <p className="text-sm text-gray-500 mt-1">Atualize seus dados pessoais e informações de pagamento</p>
            </div>

            {saved && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <p className="text-sm text-green-700 font-medium">Perfil atualizado com sucesso!</p>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                {/* Dados Pessoais */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Dados Pessoais</h3>

                    <div>
                        <label className={labelClass}>Nome *</label>
                        <input
                            required
                            type="text"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                            placeholder="Seu nome completo"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Email</label>
                        <input
                            readOnly
                            type="email"
                            value={affiliate.email}
                            className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-100 text-gray-500 px-4 py-3 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400 mt-1">O email não pode ser alterado</p>
                    </div>

                    <div>
                        <label className={labelClass}>Telefone</label>
                        <input
                            type="text"
                            value={formData.telefone}
                            onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                            placeholder="(00) 00000-0000"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Chave PIX */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-3">Chave PIX para Recebimento</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Tipo da Chave</label>
                            <select
                                value={formData.pix_tipo}
                                onChange={e => setFormData({ ...formData, pix_tipo: e.target.value })}
                                className={selectClass}
                            >
                                <option value="cpf">CPF</option>
                                <option value="cnpj">CNPJ</option>
                                <option value="email">Email</option>
                                <option value="telefone">Telefone</option>
                                <option value="chave_aleatoria">Aleatória</option>
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}>Chave PIX</label>
                            <input
                                type="text"
                                value={formData.pix_chave}
                                onChange={e => setFormData({ ...formData, pix_chave: e.target.value })}
                                placeholder="Digite sua chave PIX"
                                className={inputClass}
                            />
                        </div>
                    </div>
                </div>

                {/* Info de Comissão (somente visualização) */}
                <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
                    <h3 className="text-lg font-bold text-indigo-900 mb-3">Sua Comissão</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-indigo-600 font-medium uppercase">Tipo</p>
                            <p className="text-sm font-bold text-indigo-900 mt-1 capitalize">
                                {affiliate.tipo_comissao === 'unica' ? 'Única (1ª Mensalidade)' : 'Recorrente (Todo mês)'}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-indigo-600 font-medium uppercase">Percentual</p>
                            <p className="text-sm font-bold text-indigo-900 mt-1">{affiliate.percentual_comissao}%</p>
                        </div>
                    </div>
                    <p className="text-xs text-indigo-500 mt-3">As configurações de comissão são definidas pelo administrador.</p>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition disabled:opacity-50 shadow-lg shadow-indigo-200"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </div>
            </form>
        </div>
    );
}
