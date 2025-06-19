const membershipCommunitySchema = require('../../models/centralAdmin/membershipCommunity.model');

exports.addMembershipCommunity = async (req, res) => {
  try {
    const MembershipCommunity = req.db.model('MembershipCommunity', membershipCommunitySchema);
    const saved = await new MembershipCommunity(req.body).save();
    res.status(201).json({ status: true, message: 'Membership Community saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

exports.getMembershipCommunities = async (req, res) => {
  try {
    const MembershipCommunity = req.db.model('MembershipCommunity', membershipCommunitySchema);
    const data = await MembershipCommunity.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateMembershipCommunity = async (req, res) => {
  try {
    const MembershipCommunity = req.db.model('MembershipCommunity', membershipCommunitySchema);
    const updated = await MembershipCommunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: true, message: 'Membership Community updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteMembershipCommunity = async (req, res) => {
  try {
    const MembershipCommunity = req.db.model('MembershipCommunity', membershipCommunitySchema);
    await MembershipCommunity.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Membership Community deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
