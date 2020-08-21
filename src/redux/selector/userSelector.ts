const userSelector = (userProfile) => {
  return {
    id: userProfile.id ?? 0,
    name: userProfile.name ?? '',
    firstName: userProfile.name ? userProfile.name.split(' ')[0] : '',
    lastName: userProfile.name ? userProfile.name.split(' ').pop() : '',
    email: userProfile.email ?? '',
    phone: userProfile.phone ?? '',
    imgUrl: userProfile.img_url ?? null,
    deviceRegId: userProfile.device_reg_id ?? null,
    place: userProfile.place ?? '',
    userTypeId: userProfile.user_type_id ?? 1,
    lat: userProfile.lat ?? 0,
    long: userProfile.long ?? 0,
    defaultLat: userProfile.default_lat ?? 0,
    defaultLong: userProfile.default_long ?? 0,
    appointmentsCount: userProfile.appointments_count ?? 0,
    specializationId: userProfile.specialization_id ?? 0,
  };
};
export default userSelector;
