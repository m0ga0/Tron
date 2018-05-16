from __future__ import absolute_import
from __future__ import unicode_literals

import mock
from testify import assert_equal
from testify import run
from testify import setup
from testify import TestCase

from tron import node
from tron.core import action


class TestAction(TestCase):
    @setup
    def setup_action(self):
        self.node_pool = mock.create_autospec(node.NodePool)
        self.action = action.Action("my_action", "doit", self.node_pool)

    def test_from_config(self):
        config = mock.Mock(
            name="ted",
            command="do something",
            node="first",
            executor="ssh",
            cpus=1,
            mem=100,
            constraints=[['pool', 'LIKE', 'default']],
            docker_image='fake-docker.com:400/image',
            docker_parameters=[{
                'key': 'test',
                'value': 123
            }],
            env={'TESTING': 'true'},
            extra_volumes=[{
                'path': '/tmp'
            }],
            mesos_address='fake-mesos-master.com',
        )
        new_action = action.Action.from_config(config)
        assert_equal(new_action.name, config.name)
        assert_equal(new_action.command, config.command)
        assert_equal(new_action.node_pool, None)
        assert_equal(new_action.required_actions, [])
        assert_equal(new_action.executor, config.executor)
        assert_equal(new_action.cpus, config.cpus)
        assert_equal(new_action.mem, config.mem)
        assert_equal(new_action.constraints, config.constraints)
        assert_equal(new_action.docker_image, config.docker_image)
        assert_equal(new_action.docker_parameters, config.docker_parameters)
        assert_equal(new_action.env, config.env)
        assert_equal(new_action.extra_volumes, config.extra_volumes)
        assert_equal(new_action.mesos_address, config.mesos_address)

    def test__eq__(self):
        new_action = action.Action(
            self.action.name,
            self.action.command,
            self.node_pool,
        )
        assert_equal(new_action, self.action)


if __name__ == '__main__':
    run()
