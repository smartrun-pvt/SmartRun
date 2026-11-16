import React, { useState, useEffect } from 'react';
import { MapPin, Trash2, Pencil } from 'lucide-react';
import { SavedAddress } from '../../types';
import { fetchUserAddresses, getStoredAddresses, subscribeToAddresses } from '../../services/supabaseService';
import { ProfileSubPageNavbar } from './ProfileSubPageNavbar';

interface SavedAddressesSubPageProps {
  savedAddresses: SavedAddress[];
  displayPhone?: string;
  onBack: () => void;
  onOpenLocationModal: () => void;
  onEditAddress?: (address: SavedAddress) => void;
  onSelectAddress?: (address: SavedAddress) => void;
  onDeleteAddress: (addressId: string) => void;
}

export const SavedAddressesSubPage = ({
  savedAddresses: initialSavedAddresses,
  displayPhone,
  onBack,
  onOpenLocationModal,
  onEditAddress,
  onSelectAddress,
  onDeleteAddress
}: SavedAddressesSubPageProps) => {
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    if (initialSavedAddresses && initialSavedAddresses.length > 0) {
      return initialSavedAddresses;
    }
    return getStoredAddresses();
  });

  useEffect(() => {
    if (initialSavedAddresses && initialSavedAddresses.length > 0) {
      setAddresses(initialSavedAddresses);
    }
  }, [initialSavedAddresses]);

  useEffect(() => {
    const unsub = subscribeToAddresses((freshList) => {
      setAddresses(freshList);
    });

    fetchUserAddresses()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          setAddresses(res);
        }
      })
      .catch(() => {});

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    onDeleteAddress(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-x-clip">
      <ProfileSubPageNavbar
        title="Addresses"
        onBack={onBack}
        backTitle="Back to Profile"
        backAriaLabel="Back to Profile"
      />

      <div
        className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-4 sm:py-6 space-y-4"
        style={{
          paddingLeft: 'max(1rem, var(--safe-area-left, env(safe-area-inset-left, 0px)))',
          paddingRight: 'max(1rem, var(--safe-area-right, env(safe-area-inset-right, 0px)))'
        }}
      >
        {addresses.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-2xs">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-extrabold text-slate-800">No Saved Addresses Found</p>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Pin your home, construction site, or office for fast 60-min delivery.
            </p>
            <button
              type="button"
              onClick={onOpenLocationModal}
              className="px-4 py-2.5 bg-amber-400 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer"
            >
              Add Address Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-slate-300 transition-all"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 whitespace-nowrap shrink-0">
                      {addr.tag}
                    </span>
                    <h3 className="text-sm font-black text-slate-900 break-words">
                      {addr.houseName || addr.houseFlat || 'Address'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 break-words leading-relaxed">
                    {addr.formattedExactAddress || `${addr.houseFlat}, ${addr.buildingRoad}, ${addr.area.name}`}
                  </p>
                  {addr.receiverName && (
                    <p className="text-[11px] text-slate-500 break-words">
                      Contact: {addr.receiverName}
                      {(addr.receiverPhone || displayPhone) ? ` (${addr.receiverPhone || displayPhone})` : ''}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-1.5 shrink-0 pt-1 sm:pt-0">
                  {onSelectAddress && (
                    <button
                      type="button"
                      onClick={() => {
                        onSelectAddress(addr);
                        onBack();
                      }}
                      className="px-3 py-2 min-h-[36px] rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Select
                    </button>
                  )}
                  {onEditAddress && (
                    <button
                      type="button"
                      onClick={() => onEditAddress(addr)}
                      className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Edit Address"
                      aria-label="Edit Address"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(addr.id)}
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Address"
                    aria-label="Delete Address"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add Address button below saved addresses in yellow */}
            <div className="pt-2">
              <button
                id="btn-add-address-saved-list"
                type="button"
                onClick={onOpenLocationModal}
                className="w-full py-3 px-4 bg-amber-400 hover:bg-yellow-400 active:bg-amber-500 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center shadow-xs transition-all cursor-pointer border border-amber-500/20"
              >
                <span>Add New Address</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
