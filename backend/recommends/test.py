import numpy as np
from scipy.sparse import csr_matrix

spr_u = [0, 1, 2]      #row - User
spr_c = [0, 0, 1]      #col - City
spr_r = [3, 3, 3]

user_city_mat = csr_matrix((spr_r, (spr_u, spr_c)), shape=(3, 3))
print(user_city_mat.toarray())
spr_u.append(2)
spr_c.append(2)
spr_r.append(2)
print(user_city_mat.toarray())
print((user_city_mat*user_city_mat.transpose()).toarray())
